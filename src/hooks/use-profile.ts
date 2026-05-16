import { useCallback, useEffect, useState } from "react";

export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
}

export function useProfile(userId: string | null | undefined) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!userId) {
      setProfile(null);
      return;
    }
    setIsLoading(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data } = await supabase
        .from("profiles")
        .select("id, display_name, avatar_url")
        .eq("id", userId)
        .maybeSingle();
      setProfile(data ?? null);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  // Realtime: live-update the profile (e.g. avatar change from another tab/device)
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const { supabase } = await import("@/integrations/supabase/client");
      if (cancelled) return;
      const channel = supabase
        .channel(`profile:${userId}`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "profiles", filter: `id=eq.${userId}` },
          (payload) => {
            const next = (payload.new ?? null) as Profile | null;
            if (next) setProfile((prev) => ({ ...(prev ?? {} as any), ...next }));
          },
        )
        .subscribe();
      cleanup = () => {
        void supabase.removeChannel(channel);
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [userId]);

  return { profile, isLoading, refresh };
}
