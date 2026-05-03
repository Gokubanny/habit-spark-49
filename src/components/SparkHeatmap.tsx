export interface SparkHeatmapDetail {
  state: "answered" | "visited";
  prompt?: string;
  answer?: string;
}

interface SparkHeatmapProps {
  /** Map of date (YYYY-MM-DD) -> entry detail. Missing keys = no activity. */
  byDate: Record<string, SparkHeatmapDetail | undefined>;
  /** Number of days to show, ending today. Default 84 (12 weeks). */
  days?: number;
}

function formatDate(dateKey: string): string {
  return new Date(dateKey + "T00:00:00").toLocaleDateString(undefined, {
    month: "short", day: "numeric", year: "numeric",
  });
}

function buildTooltip(date: string, detail: SparkHeatmapDetail | undefined): string {
  const dateLabel = formatDate(date);
  if (!detail) return `${dateLabel} · Missed`;
  if (detail.state === "visited") return `${dateLabel} · Visited`;
  // answered
  const prompt = (detail.prompt || "").trim();
  const answer = (detail.answer || "").trim();
  const snippet = answer.length > 120 ? answer.slice(0, 117) + "…" : answer;
  const parts = [`${dateLabel} · Answered`];
  if (prompt) parts.push(prompt);
  if (snippet) parts.push(`“${snippet}”`);
  return parts.join("\n\n");
}

export function SparkHeatmap({ byDate, days = 84 }: SparkHeatmapProps) {
  const today = new Date();
  const todayKey = today.toISOString().split("T")[0];

  const dates: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split("T")[0]);
  }

  const firstDow = new Date(dates[0] + "T00:00:00").getDay();
  const padStart = firstDow === 0 ? 6 : firstDow - 1;

  const dayHeaders = ["M", "T", "W", "T", "F", "S", "S"];

  let answered = 0;
  let visited = 0;
  for (const d of dates) {
    const detail = byDate[d];
    if (detail?.state === "answered") answered++;
    else if (detail?.state === "visited") visited++;
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-7 gap-1">
        {dayHeaders.map((d, i) => (
          <div key={i} className="text-[10px] text-muted-foreground font-medium text-center">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: padStart }).map((_, i) => (
          <div key={`pad-${i}`} className="aspect-square" />
        ))}
        {dates.map((date) => {
          const detail = byDate[date];
          const isToday = date === todayKey;
          const cls =
            detail?.state === "answered"
              ? "bg-primary/85"
              : detail?.state === "visited"
                ? "bg-primary/30"
                : "bg-muted";
          return (
            <div
              key={date}
              title={buildTooltip(date, detail)}
              className={`aspect-square rounded-md transition-colors duration-200 ${cls} ${
                isToday ? "ring-[1.5px] ring-primary ring-offset-1 ring-offset-background" : ""
              }`}
            />
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-muted" /> Missed
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-primary/30" /> Visited
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-primary/85" /> Answered
          </div>
        </div>
        <div className="text-[11px] text-muted-foreground">
          {answered} answered · {visited + answered} visited
        </div>
      </div>
    </div>
  );
}
