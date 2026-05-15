import { cn } from "@/lib/utils";

interface UserAvatarProps {
  url?: string | null;
  email?: string | null;
  name?: string | null;
  size?: number;
  className?: string;
}

function initials(name?: string | null, email?: string | null) {
  const source = (name || email || "").trim();
  if (!source) return "·";
  const parts = source.split(/[\s@.]+/).filter(Boolean);
  const letters = (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
  return letters.toUpperCase() || source[0]!.toUpperCase();
}

export function UserAvatar({ url, email, name, size = 36, className }: UserAvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full bg-secondary text-secondary-foreground flex items-center justify-center overflow-hidden flex-shrink-0 ring-1 ring-border",
        className,
      )}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.38) }}
      aria-label={name || email || "Profile avatar"}
    >
      {url ? (
        <img src={url} alt="" className="w-full h-full object-cover" />
      ) : (
        <span className="font-semibold tracking-tight">{initials(name, email)}</span>
      )}
    </div>
  );
}
