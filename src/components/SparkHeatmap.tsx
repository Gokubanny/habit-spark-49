interface SparkHeatmapProps {
  /** Map of date (YYYY-MM-DD) -> "answered" | "visited" | undefined */
  byDate: Record<string, "answered" | "visited" | undefined>;
  /** Number of days to show, ending today. Default 84 (12 weeks). */
  days?: number;
}

export function SparkHeatmap({ byDate, days = 84 }: SparkHeatmapProps) {
  const today = new Date();
  const todayKey = today.toISOString().split("T")[0];

  // Build chronological list of dates ending today.
  const dates: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split("T")[0]);
  }

  // Pad start so columns align by weekday (Monday-first).
  const firstDow = new Date(dates[0] + "T00:00:00").getDay(); // 0 = Sun
  const padStart = firstDow === 0 ? 6 : firstDow - 1;

  const dayHeaders = ["M", "T", "W", "T", "F", "S", "S"];

  let answered = 0;
  let visited = 0;
  for (const d of dates) {
    if (byDate[d] === "answered") answered++;
    else if (byDate[d] === "visited") visited++;
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
          const state = byDate[date];
          const isToday = date === todayKey;
          const cls =
            state === "answered"
              ? "bg-primary/85"
              : state === "visited"
                ? "bg-primary/30"
                : "bg-muted";
          const label =
            state === "answered" ? "Answered" : state === "visited" ? "Visited" : "Missed";
          return (
            <div
              key={date}
              title={`${date}: ${label}`}
              className={`aspect-square rounded-md transition-colors duration-200 ${cls} ${
                isToday ? "ring-[1.5px] ring-primary ring-offset-1 ring-offset-background" : ""
              }`}
            />
          );
        })}
      </div>

      {/* Legend + totals */}
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
