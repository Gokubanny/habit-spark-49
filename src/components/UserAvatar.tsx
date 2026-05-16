import { useEffect, useState } from "react";
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
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  // Reset when url changes
  useEffect(() => {
    setLoaded(false);
    setErrored(false);
  }, [url]);

  const showImage = !!url && !errored;

  return (
    <div
      className={cn(
        "relative rounded-full bg-secondary text-secondary-foreground flex items-center justify-center overflow-hidden flex-shrink-0 ring-1 ring-border",
        className,
      )}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.38) }}
      aria-label={name || email || "Profile avatar"}
    >
      {showImage ? (
        <>
          {!loaded && (
            <div className="absolute inset-0 animate-pulse bg-muted" aria-hidden />
          )}
          <img
            src={url!}
            alt=""
            className={cn(
              "w-full h-full object-cover transition-opacity duration-200",
              loaded ? "opacity-100" : "opacity-0",
            )}
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
          />
        </>
      ) : (
        <span className="font-semibold tracking-tight">{initials(name, email)}</span>
      )}
    </div>
  );
}
