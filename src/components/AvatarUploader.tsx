import { useRef, useState } from "react";
import { Camera, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { UserAvatar } from "@/components/UserAvatar";

interface AvatarUploaderProps {
  userId: string;
  email?: string | null;
  displayName?: string | null;
  avatarUrl?: string | null;
  onChange: () => void; // refresh profile after change
}

export function AvatarUploader({ userId, email, displayName, avatarUrl, onChange }: AvatarUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image must be under 4MB");
      return;
    }

    // Local preview while uploading
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setBusy(true);

    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      // user-scoped folder name = auth.uid (matches storage RLS policy)
      const path = `${userId}/avatar-${Date.now()}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true, contentType: file.type, cacheControl: "3600" });
      if (upErr) throw upErr;

      const { data: pub } = supabase.storage.from("avatars").getPublicUrl(path);
      const publicUrl = pub.publicUrl;

      const { error: profErr } = await supabase
        .from("profiles")
        .upsert({ id: userId, avatar_url: publicUrl }, { onConflict: "id" });
      if (profErr) throw profErr;

      toast.success("Avatar updated");
      onChange();
    } catch (err: any) {
      console.error("Avatar upload failed:", err);
      toast.error(err.message || "Upload failed");
      setPreview(null);
    } finally {
      setBusy(false);
      URL.revokeObjectURL(localUrl);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemove = async () => {
    if (!avatarUrl) return;
    setBusy(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: userId, avatar_url: null }, { onConflict: "id" });
      if (error) throw error;
      setPreview(null);
      toast.success("Avatar removed");
      onChange();
    } catch (err: any) {
      toast.error(err.message || "Could not remove avatar");
    } finally {
      setBusy(false);
    }
  };

  const shownUrl = preview ?? avatarUrl ?? null;

  return (
    <div className="flex items-center gap-4 px-5 py-4">
      <div className="relative">
        <UserAvatar url={shownUrl} email={email} name={displayName} size={64} />
        {busy && (
          <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
            <Loader2 className="w-5 h-5 text-white animate-spin" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {displayName || email || "Your profile"}
        </p>
        <p className="text-[12px] text-muted-foreground">PNG or JPG · up to 4MB</p>

        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold hover:bg-primary/90 transition active:scale-[0.97] disabled:opacity-50"
          >
            <Camera className="w-3.5 h-3.5" />
            {avatarUrl ? "Change" : "Upload"}
          </button>
          {avatarUrl && (
            <button
              type="button"
              disabled={busy}
              onClick={handleRemove}
              className="inline-flex items-center gap-1.5 rounded-lg bg-muted text-muted-foreground px-3 py-1.5 text-xs font-semibold hover:text-foreground transition active:scale-[0.97] disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Remove
            </button>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
        }}
      />
    </div>
  );
}
