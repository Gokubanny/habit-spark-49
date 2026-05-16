import { q as jsxRuntimeExports, c as reactExports } from "./worker-entry-yMGtmKpA.js";
import { u as useAuth, B as BottomNav, A as AddHabitSheet } from "./use-auth-SxBD0S2x.js";
import { T as Textarea, B as Button } from "./button-CVSNb5_N.js";
import { todayDateKey, getSparkForDate, computeStreakFromDates, markSparkVisited, getAnswers, getAnswerForDate, getVisitedDates, saveAnswer } from "./spark-CNtxnI4v.js";
import { t as toast } from "./router-DljChdAV.js";
import { Q as Quote } from "./quote-BZp7Xs_C.js";
import { c as createLucideIcon } from "./createLucideIcon-BDWwxIey.js";
import { S as Sparkles, C as CalendarDays } from "./sparkles-C1VBMXel.js";
import { F as Flame } from "./flame-CpzqowzZ.js";
import { C as Check } from "./check-BeYyW1NL.js";
import "node:events";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "./utils-Bz4m9VPB.js";
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const CircleQuestionMark = createLucideIcon("circle-question-mark", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M10.94 5.274A7 7 0 0 1 15.71 10h1.79a4.5 4.5 0 0 1 4.222 6.057", key: "1uxyv8" }],
  ["path", { d: "M18.796 18.81A4.5 4.5 0 0 1 17.5 19H9A7 7 0 0 1 5.79 5.78", key: "99tcn7" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const CloudOff = createLucideIcon("cloud-off", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
];
const Cloud = createLucideIcon("cloud", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
];
const Lightbulb = createLucideIcon("lightbulb", __iconNode);
function formatDate(dateKey) {
  return (/* @__PURE__ */ new Date(dateKey + "T00:00:00")).toLocaleDateString(void 0, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function buildTooltip(date, detail) {
  const dateLabel = formatDate(date);
  if (!detail) return `${dateLabel} · Missed`;
  if (detail.state === "visited") return `${dateLabel} · Visited`;
  const prompt = (detail.prompt || "").trim();
  const answer = (detail.answer || "").trim();
  const snippet = answer.length > 120 ? answer.slice(0, 117) + "…" : answer;
  const parts = [`${dateLabel} · Answered`];
  if (prompt) parts.push(prompt);
  if (snippet) parts.push(`“${snippet}”`);
  return parts.join("\n\n");
}
function SparkHeatmap({ byDate, days = 84 }) {
  const today = /* @__PURE__ */ new Date();
  const todayKey = today.toISOString().split("T")[0];
  const dates = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split("T")[0]);
  }
  const firstDow = (/* @__PURE__ */ new Date(dates[0] + "T00:00:00")).getDay();
  const padStart = firstDow === 0 ? 6 : firstDow - 1;
  const dayHeaders = ["M", "T", "W", "T", "F", "S", "S"];
  let answered = 0;
  let visited = 0;
  for (const d of dates) {
    const detail = byDate[d];
    if (detail?.state === "answered") answered++;
    else if (detail?.state === "visited") visited++;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1", children: dayHeaders.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground font-medium text-center", children: d }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-7 gap-1", children: [
      Array.from({ length: padStart }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square" }, `pad-${i}`)),
      dates.map((date) => {
        const detail = byDate[date];
        const isToday = date === todayKey;
        const cls = detail?.state === "answered" ? "bg-primary/85" : detail?.state === "visited" ? "bg-primary/30" : "bg-muted";
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            title: buildTooltip(date, detail),
            className: `aspect-square rounded-md transition-colors duration-200 ${cls} ${isToday ? "ring-[1.5px] ring-primary ring-offset-1 ring-offset-background" : ""}`
          },
          date
        );
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-[11px] text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 rounded-sm bg-muted" }),
          " Missed"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 rounded-sm bg-primary/30" }),
          " Visited"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 rounded-sm bg-primary/85" }),
          " Answered"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground", children: [
        answered,
        " answered · ",
        visited + answered,
        " visited"
      ] })
    ] })
  ] });
}
async function getSupabase() {
  const { supabase } = await import("./client-DZSvFFWO.js");
  return supabase;
}
async function fetchSparkEntries(userId) {
  const supabase = await getSupabase();
  const { data, error } = await supabase.from("spark_entries").select("date, spark_type, prompt, answer, visited").eq("user_id", userId).order("date", { ascending: false });
  if (error) throw error;
  return data || [];
}
async function markVisitedInCloud(userId, date, sparkType, prompt) {
  const supabase = await getSupabase();
  const { error } = await supabase.from("spark_entries").upsert(
    { user_id: userId, date, spark_type: sparkType, prompt, visited: true },
    { onConflict: "user_id,date" }
  );
  if (error) throw error;
}
async function saveAnswerInCloud(userId, date, sparkType, prompt, answer) {
  const supabase = await getSupabase();
  const { error } = await supabase.from("spark_entries").upsert(
    { user_id: userId, date, spark_type: sparkType, prompt, answer, visited: true },
    { onConflict: "user_id,date" }
  );
  if (error) throw error;
}
async function seedSampleEntries(userId) {
  const supabase = await getSupabase();
  const today = /* @__PURE__ */ new Date();
  const samples = [
    { offset: 1, type: "question", prompt: "What's one small win you had today?", answer: "Took a 20-minute walk before lunch instead of doomscrolling. Felt clearer the rest of the afternoon." },
    { offset: 3, type: "quote", prompt: "Tiny changes, remarkable results. — James Clear", answer: "Reminder to keep my reading habit at just 5 pages — small enough that I never skip it." },
    { offset: 5, type: "gist", prompt: "Missing one day rarely breaks a habit. Missing two starts a new one. Don't miss twice.", answer: "I missed the gym yesterday. Going today even if it's just 15 minutes. No two in a row." },
    { offset: 8, type: "question", prompt: "What would your future self thank you for starting today?", answer: "Going to bed by 11pm. My mornings have been a mess and I know exactly why." }
  ];
  const rows = samples.map((s) => {
    const d = new Date(today);
    d.setDate(d.getDate() - s.offset);
    return {
      user_id: userId,
      date: d.toISOString().split("T")[0],
      spark_type: s.type,
      prompt: s.prompt,
      answer: s.answer,
      visited: true
    };
  });
  const { error, count } = await supabase.from("spark_entries").upsert(rows, { onConflict: "user_id,date", count: "exact" });
  if (error) throw error;
  return count ?? rows.length;
}
function SparkPage() {
  const {
    user
  } = useAuth();
  const isCloud = !!user;
  const [mounted, setMounted] = reactExports.useState(false);
  const [sheetOpen, setSheetOpen] = reactExports.useState(false);
  const [answer, setAnswer] = reactExports.useState("");
  const [savedAnswer, setSavedAnswer] = reactExports.useState(null);
  const [streak, setStreak] = reactExports.useState(0);
  const [entries, setEntries] = reactExports.useState([]);
  const [seeding, setSeeding] = reactExports.useState(false);
  const [heatmap, setHeatmap] = reactExports.useState({});
  const today = todayDateKey();
  const spark = getSparkForDate(today);
  const refresh = reactExports.useCallback(async () => {
    const map = {};
    if (isCloud && user) {
      const cloud = await fetchSparkEntries(user.id);
      const dates = cloud.filter((e) => e.visited).map((e) => e.date);
      setStreak(computeStreakFromDates(dates));
      const todays = cloud.find((e) => e.date === today);
      setSavedAnswer(todays?.answer ?? null);
      setAnswer(todays?.answer ?? "");
      setEntries(cloud.filter((e) => !!e.answer).map((e) => ({
        date: e.date,
        prompt: e.prompt,
        answer: e.answer || "",
        type: e.spark_type
      })));
      for (const e of cloud) {
        if (e.answer) {
          map[e.date] = {
            state: "answered",
            prompt: e.prompt,
            answer: e.answer
          };
        } else if (e.visited) {
          map[e.date] = {
            state: "visited",
            prompt: e.prompt
          };
        }
      }
    } else {
      markSparkVisited(today);
      const local = getAnswers().sort((a, b) => b.date.localeCompare(a.date));
      const todays = getAnswerForDate(today);
      setSavedAnswer(todays?.answer ?? null);
      setAnswer(todays?.answer ?? "");
      setEntries(local.map((a) => ({
        date: a.date,
        prompt: a.question,
        answer: a.answer
      })));
      const {
        getSparkStreak
      } = await import("./spark-CNtxnI4v.js");
      setStreak(getSparkStreak());
      for (const d of getVisitedDates()) map[d] = {
        state: "visited"
      };
      for (const a of local) map[a.date] = {
        state: "answered",
        prompt: a.question,
        answer: a.answer
      };
    }
    setHeatmap(map);
  }, [isCloud, user, today]);
  reactExports.useEffect(() => {
    setMounted(true);
    (async () => {
      if (isCloud && user) {
        try {
          await markVisitedInCloud(user.id, today, spark.type, spark.text);
        } catch (e) {
          console.error("markVisitedInCloud failed", e);
        }
      }
      await refresh();
    })();
  }, [isCloud, user, today, spark.type, spark.text, refresh]);
  if (!mounted) return null;
  const handleSave = async () => {
    const trimmed = answer.trim();
    if (!trimmed) return;
    try {
      if (isCloud && user) {
        await saveAnswerInCloud(user.id, today, spark.type, spark.text, trimmed);
      } else {
        saveAnswer(today, spark.text, trimmed);
      }
      setSavedAnswer(trimmed);
      await refresh();
      toast.success("Reflection saved");
    } catch (e) {
      console.error(e);
      toast.error("Couldn't save reflection");
    }
  };
  const handleSeed = async () => {
    if (!user) return;
    setSeeding(true);
    try {
      const n = await seedSampleEntries(user.id);
      await refresh();
      toast.success(`Added ${n} sample reflections`);
    } catch (e) {
      console.error(e);
      toast.error("Couldn't seed reflections");
    } finally {
      setSeeding(false);
    }
  };
  const Icon = spark.type === "quote" ? Quote : spark.type === "question" ? CircleQuestionMark : Lightbulb;
  const typeLabel = spark.type === "quote" ? "Quote" : spark.type === "question" ? "Question" : "Did you know";
  const gradient = spark.type === "quote" ? "from-primary/10 via-card to-card" : spark.type === "question" ? "from-accent/10 via-card to-card" : "from-secondary/30 via-card to-card";
  const journalPrompt = spark.type === "question" ? "Type your reflection…" : spark.type === "quote" ? "What does this quote mean for you today?" : "Any thoughts or how will you apply this?";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background pb-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-5 pt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight", children: "Daily Spark" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-1 text-[11px] text-muted-foreground", title: isCloud ? "Synced to your account" : "Saved on this device only", children: isCloud ? /* @__PURE__ */ jsxRuntimeExports.jsx(Cloud, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CloudOff, { className: "w-3.5 h-3.5" }) }),
          streak > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-3.5 h-3.5" }),
            streak,
            " ",
            streak === 1 ? "day" : "days"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-3xl border border-border/60 bg-gradient-to-br ${gradient} p-7 shadow-sm`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-primary font-semibold mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
          typeLabel
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl leading-snug font-medium text-foreground tracking-tight", children: spark.type === "quote" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "“",
          spark.text,
          "”"
        ] }) : spark.text }),
        spark.attribution && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-4", children: [
          "— ",
          spark.attribution
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: answer, onChange: (e) => setAnswer(e.target.value), placeholder: journalPrompt, rows: 4, className: "resize-none bg-background/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            savedAnswer && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-primary" }),
              "Saved"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSave, size: "sm", className: "ml-auto", disabled: !answer.trim() || answer.trim() === savedAnswer, children: savedAnswer ? "Update" : "Save" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-4", children: [
        isCloud ? "Synced across your devices." : "Sign in to sync across devices.",
        " A new Spark arrives every day at midnight."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider", children: "Last 12 weeks" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border/60 bg-card p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SparkHeatmap, { byDate: heatmap }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider", children: "Your reflections" }),
          isCloud && entries.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSeed, size: "sm", variant: "outline", disabled: seeding, children: seeding ? "Adding…" : "Add samples" })
        ] }),
        entries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border/60 py-10 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No reflections yet." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Save one above to start your journal." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: entries.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-card p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-1.5", children: (/* @__PURE__ */ new Date(a.date + "T00:00:00")).toLocaleDateString(void 0, {
            month: "short",
            day: "numeric",
            year: "numeric"
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground/90 mb-2", children: a.prompt }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground whitespace-pre-wrap", children: a.answer })
        ] }, a.date)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, { onAddClick: () => setSheetOpen(true) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddHabitSheet, { open: sheetOpen, onClose: () => setSheetOpen(false), onAdd: () => setSheetOpen(false) })
  ] });
}
export {
  SparkPage as component
};
