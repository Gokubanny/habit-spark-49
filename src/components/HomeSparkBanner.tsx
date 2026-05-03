import { Link } from "@tanstack/react-router";
import { Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getSparkForDate, todayDateKey, isBannerDismissedToday, dismissBannerToday } from "@/lib/spark";

export function HomeSparkBanner() {
  const [visible, setVisible] = useState(false);
  const [spark, setSpark] = useState<ReturnType<typeof getSparkForDate> | null>(null);

  useEffect(() => {
    if (!isBannerDismissedToday()) {
      setSpark(getSparkForDate(todayDateKey()));
      setVisible(true);
    }
  }, []);

  if (!visible || !spark) return null;

  const label = spark.type === "quote" ? "Today's quote" : spark.type === "question" ? "Reflect on this" : "Did you know";

  return (
    <div className="relative mb-4 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card p-4 overflow-hidden">
      <button
        onClick={() => {
          dismissBannerToday();
          setVisible(false);
        }}
        className="absolute top-2 right-2 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-3.5 h-3.5" />
      </button>
      <Link to="/spark" className="block pr-6">
        <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-primary font-semibold mb-1.5">
          <Sparkles className="w-3 h-3" />
          {label}
        </div>
        <p className="text-sm text-foreground/90 leading-snug line-clamp-2">{spark.text}</p>
        {spark.attribution && (
          <p className="text-xs text-muted-foreground mt-1">— {spark.attribution}</p>
        )}
      </Link>
    </div>
  );
}
