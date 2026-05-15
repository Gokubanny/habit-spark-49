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

  return { profile, isLoading, refresh };
}
