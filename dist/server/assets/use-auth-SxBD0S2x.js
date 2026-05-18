import { u as useRouterState, q as jsxRuntimeExports, c as reactExports } from "./worker-entry-yMGtmKpA.js";
import { L as Link } from "./router-DljChdAV.js";
import { c as createLucideIcon } from "./createLucideIcon-BDWwxIey.js";
import { S as Sparkles, C as CalendarDays, B as Bell } from "./sparkles-C1VBMXel.js";
function useLocation(opts) {
  return useRouterState({
    select: (state) => state.location
  });
}
const __iconNode$4 = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }],
  ["path", { d: "M14 4h7", key: "3xa0d5" }],
  ["path", { d: "M14 9h7", key: "1icrd9" }],
  ["path", { d: "M14 15h7", key: "1mj8o2" }],
  ["path", { d: "M14 20h7", key: "11slyb" }]
];
const LayoutList = createLucideIcon("layout-list", __iconNode$4);
const __iconNode$3 = [
  [
    "path",
    {
      d: "M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",
      key: "1n2ejm"
    }
  ],
  [
    "path",
    {
      d: "M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1",
      key: "1qfcsi"
    }
  ]
];
const MessagesSquare = createLucideIcon("messages-square", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode$1);
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function BottomNav({ onAddClick }) {
  const location = useLocation();
  const path = location.pathname;
  const navItems = [
    { to: "/app", icon: LayoutList, label: "Today" },
    { to: "/spark", icon: Sparkles, label: "Spark" },
    { to: "/questions", icon: MessagesSquare, label: "Ask" },
    { to: "/insights", icon: CalendarDays, label: "Insights" },
    { to: "/settings", icon: Settings, label: "Settings" }
  ];
  const activeIndex = navItems.findIndex(
    (item) => path === item.to || path.startsWith(item.to + "/")
  );
  const count = navItems.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-lg mx-auto px-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "relative flex items-center rounded-2xl border border-border/60 bg-card/80 backdrop-blur-2xl px-1.5 py-1.5 shadow-[0_-4px_24px_-4px_rgba(0,0,0,0.08)]", children: [
    activeIndex >= 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute h-[calc(100%-12px)] rounded-xl bg-primary/10 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        style: {
          width: `calc((100% - ${12 + 48}px) / ${count})`,
          left: `calc(6px + ${activeIndex} * ((100% - ${12 + 48}px) / ${count}))`
        }
      }
    ),
    navItems.map(({ to, icon: Icon, label }) => {
      const isActive = path === to;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to,
          className: `relative flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-sm font-medium transition-colors duration-200 active:scale-95 ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-[18px] h-[18px]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[13px] ${isActive ? "" : "hidden sm:inline"}`, children: label })
          ]
        },
        to
      );
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: onAddClick,
        className: "flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-90 animate-subtle-pulse",
        "aria-label": "Add habit",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-5 h-5", strokeWidth: 2.5 })
      }
    )
  ] }) }) });
}
const HABITS_KEY = "continuum_habits";
const LOGS_KEY = "continuum_logs";
const HABIT_COLORS = [
  "oklch(0.38 0.08 160)",
  // forest
  "oklch(0.55 0.15 200)",
  // ocean
  "oklch(0.60 0.15 50)",
  // amber
  "oklch(0.50 0.15 320)",
  // berry
  "oklch(0.55 0.12 270)",
  // lavender
  "oklch(0.50 0.10 100)"
  // olive
];
const MILESTONE_STREAKS = [7, 14, 21, 30, 50, 100, 200, 365];
function getHabits() {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(HABITS_KEY);
  if (!raw) return [];
  const habits = JSON.parse(raw);
  return habits.map((h) => ({
    ...h,
    frequency: h.frequency ?? { type: "daily" },
    reminderTime: h.reminderTime ?? null
  }));
}
function saveHabits(habits) {
  localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
}
function getLogs() {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(LOGS_KEY);
  return raw ? JSON.parse(raw) : [];
}
function saveLogs(logs) {
  localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
}
function todayKey() {
  return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
}
function isScheduledForDate(habit, dateStr) {
  const freq = habit.frequency;
  if (freq.type === "daily") return true;
  if (freq.type === "weekdays") {
    const dayOfWeek = (/* @__PURE__ */ new Date(dateStr + "T00:00:00")).getDay();
    return freq.days.includes(dayOfWeek);
  }
  if (freq.type === "weekly") {
    return true;
  }
  return true;
}
function isScheduledToday(habit) {
  return isScheduledForDate(habit, todayKey());
}
function isCompletedToday(habitId, logs) {
  const today = todayKey();
  return logs.some((l) => l.habitId === habitId && l.date === today);
}
function toggleHabit(habitId, logs) {
  const today = todayKey();
  const exists = logs.some((l) => l.habitId === habitId && l.date === today);
  if (exists) {
    return logs.filter((l) => !(l.habitId === habitId && l.date === today));
  }
  return [...logs, { habitId, date: today }];
}
function getStreak(habitId, logs, habits) {
  const habitLogs = logs.filter((l) => l.habitId === habitId).map((l) => l.date).sort().reverse();
  if (habitLogs.length === 0) return 0;
  const today = todayKey();
  const yesterday = /* @__PURE__ */ new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().split("T")[0];
  if (habitLogs[0] !== today && habitLogs[0] !== yesterdayKey) return 0;
  const habit = habits?.find((h) => h.id === habitId);
  let streak = 1;
  for (let i = 1; i < habitLogs.length; i++) {
    const curr = new Date(habitLogs[i - 1]);
    const prev = new Date(habitLogs[i]);
    const diff = (curr.getTime() - prev.getTime()) / (1e3 * 60 * 60 * 24);
    if (diff === 1) {
      streak++;
    } else if (habit && habit.frequency.type === "weekdays" && diff <= 3) {
      let allSkipped = true;
      for (let d = 1; d < diff; d++) {
        const between = new Date(prev);
        between.setDate(between.getDate() + d);
        const betweenKey = between.toISOString().split("T")[0];
        if (isScheduledForDate(habit, betweenKey)) {
          allSkipped = false;
          break;
        }
      }
      if (allSkipped) streak++;
      else break;
    } else {
      break;
    }
  }
  return streak;
}
function getLongestStreak(habitId, logs) {
  const dates = logs.filter((l) => l.habitId === habitId).map((l) => l.date).sort();
  if (dates.length === 0) return 0;
  let longest = 1;
  let current = 1;
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1]);
    const curr = new Date(dates[i]);
    const diff = (curr.getTime() - prev.getTime()) / (1e3 * 60 * 60 * 24);
    if (diff === 1) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }
  return longest;
}
function getCompletionRate(habitId, logs, habit) {
  const created = new Date(habit.createdAt);
  const today = /* @__PURE__ */ new Date();
  let scheduledDays = 0;
  const d = new Date(created);
  while (d <= today) {
    const key = d.toISOString().split("T")[0];
    if (isScheduledForDate(habit, key)) {
      scheduledDays++;
    }
    d.setDate(d.getDate() + 1);
  }
  if (scheduledDays === 0) return 0;
  const completedDays = logs.filter((l) => l.habitId === habitId).length;
  return Math.round(completedDays / scheduledDays * 100);
}
function getLast30DaysMap(habitId, logs) {
  const map = /* @__PURE__ */ new Map();
  const habitLogs = new Set(logs.filter((l) => l.habitId === habitId).map((l) => l.date));
  for (let i = 29; i >= 0; i--) {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    map.set(key, habitLogs.has(key));
  }
  return map;
}
function createHabit(name, description, color, frequency = { type: "daily" }, reminderTime = null) {
  return {
    id: crypto.randomUUID(),
    name,
    description,
    color,
    frequency,
    reminderTime,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function updateHabit(habits, updated) {
  return habits.map((h) => h.id === updated.id ? updated : h);
}
function getMilestoneMessage(streak) {
  if (!MILESTONE_STREAKS.includes(streak)) return null;
  const messages = {
    7: "🌱 One week strong!",
    14: "🌿 Two weeks — you're building momentum!",
    21: "🍃 Three weeks! Habits are forming.",
    30: "🌳 One month! You're unstoppable.",
    50: "🏔️ Fifty days! Incredible dedication.",
    100: "💯 One hundred days! Legendary.",
    200: "⭐ Two hundred days! You're an inspiration.",
    365: "🎉 One full year! What an achievement!"
  };
  return messages[streak] || null;
}
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function frequencyLabel(freq) {
  if (freq.type === "daily") return "Every day";
  if (freq.type === "weekdays") {
    return freq.days.map((d) => DAY_LABELS[d]).join(", ");
  }
  if (freq.type === "weekly") {
    return `${freq.times}× per week`;
  }
  return "Every day";
}
function FrequencyPicker({ value, onChange }) {
  const mode = value.type;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground mb-2 block", children: "Frequency" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 rounded-xl bg-muted p-1 mb-3", children: [
      { type: "daily", label: "Daily" },
      { type: "weekdays", label: "Specific days" },
      { type: "weekly", label: "Per week" }
    ].map(({ type, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => {
          if (type === "daily") onChange({ type: "daily" });
          else if (type === "weekdays") onChange({ type: "weekdays", days: [1, 3, 5] });
          else onChange({ type: "weekly", times: 3 });
        },
        className: `flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-200 active:scale-95 ${mode === type ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
        children: label
      },
      type
    )) }),
    mode === "weekdays" && value.type === "weekdays" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: DAY_LABELS.map((label, i) => {
      const selected = value.days.includes(i);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            const days = selected ? value.days.filter((d) => d !== i) : [...value.days, i].sort();
            if (days.length > 0) onChange({ type: "weekdays", days });
          },
          className: `flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-200 active:scale-90 ${selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`,
          children: label.charAt(0)
        },
        i
      );
    }) }),
    mode === "weekly" && value.type === "weekly" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange({ type: "weekly", times: Math.max(1, value.times - 1) }),
          className: "w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground font-medium hover:bg-muted/80 transition-colors active:scale-90",
          children: "−"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-lg font-semibold text-foreground tabular-nums w-12 text-center", children: [
        value.times,
        "×"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange({ type: "weekly", times: Math.min(7, value.times + 1) }),
          className: "w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground font-medium hover:bg-muted/80 transition-colors active:scale-90",
          children: "+"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "per week" })
    ] })
  ] });
}
const COLOR_NAMES = {
  "oklch(0.38 0.08 160)": "Forest",
  "oklch(0.55 0.15 200)": "Ocean",
  "oklch(0.60 0.15 50)": "Amber",
  "oklch(0.50 0.15 320)": "Berry",
  "oklch(0.55 0.12 270)": "Lavender",
  "oklch(0.50 0.10 100)": "Olive"
};
const MAX_NAME = 40;
function AddHabitSheet({ open, onClose, onAdd }) {
  reactExports.useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const [name, setName] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [selectedColor, setSelectedColor] = reactExports.useState(HABIT_COLORS[0]);
  const [frequency, setFrequency] = reactExports.useState({ type: "daily" });
  const [reminderTime, setReminderTime] = reactExports.useState("");
  const [showReminder, setShowReminder] = reactExports.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(createHabit(name.trim(), description.trim(), selectedColor, frequency, reminderTime || null));
    setName("");
    setDescription("");
    setSelectedColor(HABIT_COLORS[0]);
    setFrequency({ type: "daily" });
    setReminderTime("");
    setShowReminder(false);
    onClose();
  };
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 bg-black/40",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl border-t border-border p-6 pb-[calc(2.5rem+env(safe-area-inset-bottom))] animate-spring-up max-h-[85vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-1 rounded-full bg-border" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground", children: "New habit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors active:scale-95",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-[11px] tabular-nums ${name.length >= MAX_NAME ? "text-destructive" : "text-muted-foreground"}`, children: [
              name.length,
              "/",
              MAX_NAME
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: name,
              onChange: (e) => setName(e.target.value.slice(0, MAX_NAME)),
              placeholder: "e.g. Morning walk",
              className: "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200",
              autoFocus: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground mb-1.5 block", children: "Description (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: description,
              onChange: (e) => setDescription(e.target.value),
              placeholder: "A short note about this habit",
              className: "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FrequencyPicker, { value: frequency, onChange: setFrequency }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground mb-2 block", children: "Color" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 items-center", children: HABIT_COLORS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSelectedColor(c),
              className: `w-9 h-9 rounded-full transition-all duration-200 active:scale-90 ${selectedColor === c ? "ring-2 ring-offset-2 ring-offset-card ring-ring scale-110" : "hover:scale-105"}`,
              style: { backgroundColor: c },
              title: COLOR_NAMES[c] || c
            },
            c
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-2", children: COLOR_NAMES[selectedColor] || "Custom" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowReminder(!showReminder),
              className: "flex items-center gap-2 text-sm font-medium text-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-muted-foreground" }),
                "Reminder",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: "(optional)" })
              ]
            }
          ),
          showReminder && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "time",
                value: reminderTime,
                onChange: (e) => setReminderTime(e.target.value),
                className: "rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
              }
            ),
            reminderTime && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setReminderTime("");
                  setShowReminder(false);
                },
                className: "ml-2 text-xs text-muted-foreground hover:text-foreground",
                children: "Clear"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: !name.trim(),
            className: "w-full rounded-xl bg-primary text-primary-foreground py-3.5 text-sm font-medium hover:bg-primary/90 transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none",
            children: "Add habit"
          }
        )
      ] })
    ] })
  ] });
}
function useAuth() {
  const [user, setUser] = reactExports.useState(null);
  const [session, setSession] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    import("./client-DZSvFFWO.js").then(({ supabase }) => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session2) => {
        setSession(session2);
        setUser(session2?.user ?? null);
        setIsLoading(false);
      });
      supabase.auth.getSession().then(({ data: { session: session2 } }) => {
        setSession(session2);
        setUser(session2?.user ?? null);
        setIsLoading(false);
      });
      return () => subscription.unsubscribe();
    });
  }, []);
  const signOut = reactExports.useCallback(async () => {
    const { supabase } = await import("./client-DZSvFFWO.js");
    await supabase.auth.signOut();
  }, []);
  return { user, session, isLoading, signOut };
}
export {
  AddHabitSheet as A,
  BottomNav as B,
  FrequencyPicker as F,
  HABIT_COLORS as H,
  MessagesSquare as M,
  Plus as P,
  X,
  getLogs as a,
  saveLogs as b,
  getLast30DaysMap as c,
  getCompletionRate as d,
  getLongestStreak as e,
  getStreak as f,
  getHabits as g,
  frequencyLabel as h,
  isCompletedToday as i,
  createHabit as j,
  isScheduledToday as k,
  toggleHabit as l,
  updateHabit as m,
  getMilestoneMessage as n,
  saveHabits as s,
  todayKey as t,
  useAuth as u
};
