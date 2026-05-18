import { q as jsxRuntimeExports, c as reactExports } from "./worker-entry-yMGtmKpA.js";
import { c as getLast30DaysMap, u as useAuth, i as isCompletedToday, d as getCompletionRate, e as getLongestStreak, f as getStreak, B as BottomNav, A as AddHabitSheet, g as getHabits, a as getLogs, s as saveHabits } from "./use-auth-SxBD0S2x.js";
import { f as fetchHabitsFromCloud, a as fetchLogsFromCloud, s as saveHabitToCloud } from "./habits-cloud-BEKJqQAE.js";
import { C as ChartColumn, T as TrendingUp } from "./trending-up-Ct8Dr6zR.js";
import { F as Flame } from "./flame-CpzqowzZ.js";
import { c as createLucideIcon } from "./createLucideIcon-BDWwxIey.js";
import "node:events";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "./router-DljChdAV.js";
import "./sparkles-C1VBMXel.js";
const __iconNode = [
  ["path", { d: "M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978", key: "1n3hpd" }],
  ["path", { d: "M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978", key: "rfe1zi" }],
  ["path", { d: "M18 9h1.5a1 1 0 0 0 0-5H18", key: "7xy6bh" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z", key: "1mhfuq" }],
  ["path", { d: "M6 9H4.5a1 1 0 0 1 0-5H6", key: "tex48p" }]
];
const Trophy = createLucideIcon("trophy", __iconNode);
function CalendarHeatmap({ habitId, logs, color }) {
  const daysMap = getLast30DaysMap(habitId, logs);
  const entries = Array.from(daysMap.entries());
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const getIntensity = (date) => {
    const idx = entries.findIndex(([d]) => d === date);
    if (idx === -1 || !entries[idx][1]) return 0;
    let streak = 1;
    for (let i = idx - 1; i >= 0; i--) {
      if (entries[i][1]) streak++;
      else break;
    }
    if (streak >= 7) return 4;
    if (streak >= 4) return 3;
    if (streak >= 2) return 2;
    return 1;
  };
  const dayHeaders = ["M", "T", "W", "T", "F", "S", "S"];
  const firstDate = entries[0]?.[0];
  const firstDay = firstDate ? new Date(firstDate).getDay() : 1;
  const padStart = firstDay === 0 ? 6 : firstDay - 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1", children: dayHeaders.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground font-medium text-center", children: d }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-7 gap-1", children: [
      Array.from({ length: padStart }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square" }, `pad-${i}`)),
      entries.map(([date, done]) => {
        const isToday = date === today;
        const intensity = getIntensity(date);
        const opacityMap = {
          0: "bg-muted",
          1: "bg-primary/25",
          2: "bg-primary/45",
          3: "bg-primary/65",
          4: "bg-primary/85"
        };
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            title: `${date}: ${done ? `${intensity}-day streak` : "Missed"}`,
            className: `
                aspect-square rounded-md transition-colors duration-200
                ${done ? opacityMap[intensity] : opacityMap[0]}
                ${isToday ? "ring-[1.5px] ring-primary ring-offset-1 ring-offset-background" : ""}
              `,
            style: done && color ? { backgroundColor: color, opacity: 0.2 + intensity * 0.2 } : void 0
          },
          date
        );
      })
    ] })
  ] });
}
function Sparkline({
  habitId,
  logs
}) {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    days.push(logs.some((l) => l.habitId === habitId && l.date === key));
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-[3px] h-8", children: days.map((done, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-[6px] rounded-sm transition-all duration-300 ${done ? "bg-primary" : "bg-border"}`, style: {
    height: done ? "100%" : "30%"
  } }, i)) });
}
function InsightsPage() {
  const {
    user,
    isLoading: authLoading
  } = useAuth();
  const [habits, setHabits] = reactExports.useState([]);
  const [logs, setLogs] = reactExports.useState([]);
  const [sheetOpen, setSheetOpen] = reactExports.useState(false);
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (authLoading) return;
    const loadData = async () => {
      if (user) {
        try {
          const [h, l] = await Promise.all([fetchHabitsFromCloud(user.id), fetchLogsFromCloud(user.id)]);
          setHabits(h);
          setLogs(l);
        } catch {
          setHabits(getHabits());
          setLogs(getLogs());
        }
      } else {
        setHabits(getHabits());
        setLogs(getLogs());
      }
      setMounted(true);
    };
    loadData();
  }, [user, authLoading]);
  const handleAdd = async (habit) => {
    const updated = [...habits, habit];
    setHabits(updated);
    if (user) {
      try {
        await saveHabitToCloud(habit, user.id, updated.length - 1);
      } catch {
      }
    } else {
      saveHabits(updated);
    }
  };
  if (!mounted || authLoading) return null;
  const totalHabits = habits.length;
  const todayCompleted = habits.filter((h) => isCompletedToday(h.id, logs)).length;
  const avgRate = totalHabits > 0 ? Math.round(habits.reduce((sum, h) => sum + getCompletionRate(h.id, logs, h), 0) / totalHabits) : 0;
  const bestStreak = totalHabits > 0 ? Math.max(...habits.map((h) => getLongestStreak(h.id, logs))) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen pb-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-5 pt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-up-blur", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-muted-foreground font-medium", children: "Your progress" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold text-foreground mt-0.5 tracking-tight", style: {
          lineHeight: "1.2"
        }, children: "Insights" })
      ] }),
      habits.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20 animate-fade-up-blur", style: {
        animationDelay: "80ms"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-3xl bg-accent/40 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-8 h-8 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold text-lg", children: "No insights yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1.5 max-w-[240px] mx-auto", style: {
          textWrap: "pretty"
        }, children: "Add a habit and start logging to see your data here" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)] p-5 animate-fade-up-blur", style: {
          animationDelay: "60ms"
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-2xl font-semibold text-foreground tabular-nums", children: [
              todayCompleted,
              "/",
              totalHabits
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "Today" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-2xl font-semibold text-primary tabular-nums", children: [
              avgRate,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "Avg. rate" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-2xl font-semibold text-foreground tabular-nums", children: bestStreak }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "Best streak" })
          ] })
        ] }) }),
        habits.map((habit, i) => {
          const streak = getStreak(habit.id, logs);
          const longest = getLongestStreak(habit.id, logs);
          const rate = getCompletionRate(habit.id, logs, habit);
          const totalCompletions = logs.filter((l) => l.habitId === habit.id).length;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl bg-card shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)] overflow-hidden animate-fade-up-blur", style: {
            animationDelay: `${(i + 1) * 80}ms`
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-3 top-4 bottom-4 w-1 rounded-full", style: {
              backgroundColor: habit.color
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 pl-7 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 rounded-full", style: {
                    backgroundColor: habit.color
                  } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-medium text-foreground", children: habit.name })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkline, { habitId: habit.id, logs })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-muted/60 p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-3.5 h-3.5 text-primary mb-1.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xl font-semibold text-foreground tabular-nums leading-none", children: streak }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-1", children: "Current" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-muted/60 p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-3.5 h-3.5 text-primary mb-1.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xl font-semibold text-foreground tabular-nums leading-none", children: longest }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-1", children: "Best" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-muted/60 p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5 text-primary mb-1.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xl font-semibold text-foreground tabular-nums leading-none", children: [
                    rate,
                    "%"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-1", children: "Rate" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mb-2 font-medium uppercase tracking-wider", children: "Last 30 days" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarHeatmap, { habitId: habit.id, logs, color: habit.color })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
                totalCompletions,
                " total completion",
                totalCompletions !== 1 ? "s" : ""
              ] })
            ] })
          ] }, habit.id);
        })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, { onAddClick: () => setSheetOpen(true) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddHabitSheet, { open: sheetOpen, onClose: () => setSheetOpen(false), onAdd: handleAdd })
  ] });
}
export {
  InsightsPage as component
};
