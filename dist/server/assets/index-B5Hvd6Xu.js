import { c as reactExports, q as jsxRuntimeExports } from "./worker-entry-C_iL5ijn.js";
import { u as useNavigate, L as Link } from "./router-ljpxEWYu.js";
import { s as shadowBg } from "./shadow-bg-Dbq8hi8e.js";
import { F as Flame } from "./flame-EFMJQAXD.js";
import { A as ArrowRight } from "./arrow-right-DPyU0dV-.js";
import { c as createLucideIcon } from "./createLucideIcon-DIdLOON3.js";
import { C as CalendarDays, B as Bell, S as Sparkles } from "./sparkles-DMB3hRYU.js";
import { C as ChartColumn, T as TrendingUp } from "./trending-up-B7FhwjLw.js";
import { M as Moon } from "./moon-6aKnoTbd.js";
import { Q as Quote } from "./quote-Q7HEAhtD.js";
import "node:events";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M12 13v8", key: "1l5pq0" }],
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "m8 17 4-4 4 4", key: "1quai1" }]
];
const CloudUpload = createLucideIcon("cloud-upload", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
const heroBg = "/assets/hero-bg-BL3Dului.jpg";
function LandingPage() {
  const navigate = useNavigate();
  const [checked, setChecked] = reactExports.useState(false);
  reactExports.useEffect(() => {
    import("./client-DZSvFFWO.js").then(({
      supabase
    }) => {
      supabase.auth.getSession().then(({
        data: {
          session
        }
      }) => {
        if (session?.user) {
          navigate({
            to: "/app"
          });
        } else {
          setChecked(true);
        }
      });
    }).catch(() => setChecked(true));
  }, [navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Features, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HowItWorks, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reviews, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FinalCTA, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative pb-24 pt-0 lg:pb-32 lg:pt-8 xl:pb-40 xl:pt-12", style: {
    background: "#050d0a"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroBg, alt: "", width: 1920, height: 1080, className: "absolute inset-0 w-full h-full object-cover object-right pointer-events-none select-none", "aria-hidden": "true" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", style: {
      background: `linear-gradient(to right, rgba(5,13,10,0.5), rgba(5,13,10,0.13), transparent)`
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", style: {
      background: `linear-gradient(to bottom, rgba(0,0,0,0.26), transparent, rgba(5,13,10,0))`
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "relative z-20 max-w-5xl mx-auto px-5 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-7 h-7 text-white", strokeWidth: 2.5 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-semibold text-white/90 tracking-tight", children: "Emberly" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-8 text-sm text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#features", className: "hover:text-white/70 transition-colors", children: "Features" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#how-it-works", className: "hover:text-white/70 transition-colors", children: "How it works" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#reviews", className: "hover:text-white/70 transition-colors", children: "Reviews" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/login", className: "inline-flex items-center gap-1.5 rounded-xl border border-white/30 bg-white/10 text-white px-5 py-2.5 text-sm font-medium hover:bg-white/20 backdrop-blur-sm transition-all duration-200 active:scale-[0.97]", children: [
        "Get started",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 max-w-5xl mx-auto px-5 pt-24 pb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { delay: 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white text-left", style: {
        lineHeight: "1.08"
      }, children: [
        "Build lasting habits,",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "one day at a time"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { delay: 160, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-lg text-white text-left", style: {
        textWrap: "pretty",
        lineHeight: "1.6"
      }, children: "Emberly is a calm, focused habit tracker that helps you build consistency through streaks, visual progress, and zero distractions." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { delay: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex flex-col sm:flex-row items-start gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/login", className: "inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-7 py-3.5 text-sm font-bold hover:bg-primary/90 transition-all duration-200 active:scale-[0.97] shadow-lg shadow-primary/25", children: [
        "Get started free",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
      ] }) }) })
    ] }) })
  ] }) });
}
const features = [{
  icon: Flame,
  title: "Streak tracking",
  desc: "Watch your momentum build day by day. Never break the chain."
}, {
  icon: CalendarDays,
  title: "Calendar heatmap",
  desc: "See your consistency at a glance with a beautiful 30-day view."
}, {
  icon: ChartColumn,
  title: "Smart insights",
  desc: "Current streak, longest streak, completion rate — all the stats that matter."
}, {
  icon: Bell,
  title: "Gentle reminders",
  desc: "Set custom reminder times so you never forget your daily rituals."
}, {
  icon: Moon,
  title: "Dark mode",
  desc: "Easy on the eyes, day or night. Follows your system or your choice."
}, {
  icon: CloudUpload,
  title: "Cloud sync",
  desc: "Sign in to sync your habits across devices. Your data, always safe."
}];
function Features() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "features", className: "py-28 relative bg-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", style: {
      backgroundImage: `url(${shadowBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      opacity: 0.75
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-5 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row items-start gap-12 lg:gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full lg:w-[420px] flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-white border border-black/[0.06] shadow-xl overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-black/5 px-5 py-3 flex items-center gap-3 bg-gray-50/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-black/10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-black/10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-black/10" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-black/40", children: "Good morning" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-black/90 mt-0.5", children: "Your daily ritual" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-black/40 mt-1", children: "Tuesday, March 25 · 2 of 4 minted" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-20 h-20 rounded-full border-[4px] border-black/[0.06] flex items-center justify-center relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "absolute inset-0 w-full h-full -rotate-90", viewBox: "0 0 80 80", children: /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "40", cy: "40", r: "35", fill: "none", strokeWidth: "4", stroke: "oklch(0.55 0.06 142)", strokeDasharray: "220", strokeDashoffset: "110", strokeLinecap: "round" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-black/80", children: "50%" })
          ] }) }),
          [{
            name: "Morning meditation",
            color: "oklch(0.55 0.06 142)",
            done: true
          }, {
            name: "Read 20 pages",
            color: "hsl(217, 91%, 60%)",
            done: true
          }, {
            name: "Exercise 30 min",
            color: "hsl(25, 95%, 53%)",
            done: false
          }, {
            name: "Journal",
            color: "hsl(270, 95%, 75%)",
            done: false
          }].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-xl border border-black/[0.06] bg-black/[0.02] px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full flex-shrink-0", style: {
              backgroundColor: h.color
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex-1 text-sm ${h.done ? "line-through text-black/30" : "text-black/70"}`, children: h.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-5 h-5 rounded-full border-2 flex items-center justify-center ${h.done ? "bg-primary border-primary" : "border-black/15"}`, children: h.done && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-white" }) })
          ] }, h.name))
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary mb-3", children: "Features" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl sm:text-4xl font-bold tracking-tight text-foreground", style: {
            lineHeight: "1.15"
          }, children: [
            "Everything you need,",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "nothing you don't"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-5", children: features.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { delay: i * 70, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-2xl border border-black/[0.04] bg-black/[0.03] p-5 hover:bg-black/[0.05] hover:border-black/[0.08] transition-all duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "w-5 h-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-1", children: f.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: f.desc })
        ] }) }, f.title)) })
      ] })
    ] }) })
  ] });
}
const steps = [{
  num: "1",
  icon: CircleCheck,
  title: "Create your habits",
  desc: "Add the habits you want to build — daily, specific days, or a weekly goal."
}, {
  num: "2",
  icon: Sparkles,
  title: "Tap to complete",
  desc: "One tap each day to log your progress. Quick, satisfying, done."
}, {
  num: "3",
  icon: TrendingUp,
  title: "Watch your growth",
  desc: "See streaks grow, heatmaps fill in, and your consistency compound over time."
}];
function HowItWorks() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "how-it-works", className: "py-28 bg-white border-y border-border/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary mb-3", children: "How it works" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl sm:text-4xl font-bold tracking-tight text-foreground", style: {
        lineHeight: "1.15"
      }, children: "Three steps to a better routine" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid md:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block absolute top-7 left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] h-px border-t-2 border-dashed border-primary/20" }),
      steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { delay: i * 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-5 text-lg font-bold shadow-lg shadow-primary/15", children: s.num }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-lg mb-2", children: s.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto", children: s.desc })
      ] }) }, s.num))
    ] })
  ] }) });
}
const reviews = [{
  name: "Daniel Cooper",
  role: "Product designer",
  avatar: "https://trovdwfeqyzlxzrtfbjv.supabase.co/storage/v1/object/public/assets/avatars/e20b66f6-e7e9-4c00-93d3-506c78cb66c2/avatar-19.jpg",
  quote: "Finally a habit app that doesn't try to be a social network. Just me and my habits.",
  rating: 5
}, {
  name: "Emma Lindström",
  role: "Software engineer",
  avatar: "https://trovdwfeqyzlxzrtfbjv.supabase.co/storage/v1/object/public/assets/avatars/307e7512-1637-4ea2-a5cd-875afeb1002b/avatar-21.jpg",
  quote: "The streak tracking is addictive in the best way. I've been consistent for 47 days now.",
  rating: 5
}, {
  name: "Ryan Mitchell",
  role: "Grad student",
  avatar: "https://trovdwfeqyzlxzrtfbjv.supabase.co/storage/v1/object/public/assets/avatars/6b77ccde-dbfd-4c23-8c9f-ce748683068a/avatar-16.jpg",
  quote: "Love the heatmap. Seeing my progress visually keeps me motivated more than any badge system.",
  rating: 5
}, {
  name: "Mei Lin",
  role: "Freelance writer",
  avatar: "https://trovdwfeqyzlxzrtfbjv.supabase.co/storage/v1/object/public/assets/avatars/b706d9a7-3a45-4fdd-ab47-c7023d4d0cfa/avatar-20.jpg",
  quote: "Simple, clean, no ads. This is what every habit tracker should be. Dark mode is gorgeous too.",
  rating: 5
}];
function Reviews() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "reviews", className: "py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary mb-3", children: "Reviews" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl sm:text-4xl font-bold tracking-tight text-foreground", style: {
        lineHeight: "1.15"
      }, children: "Loved by habit builders" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-5", children: reviews.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { delay: i * 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl border border-border/50 bg-card p-6 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "absolute top-4 right-4 w-10 h-10 text-primary/[0.06] rotate-180" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 mb-4", children: Array.from({
        length: r.rating
      }).map((_, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-primary text-primary" }, j)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground leading-relaxed mb-5 relative", children: [
        '"',
        r.quote,
        '"'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: r.avatar, alt: r.name, className: "w-[4.5rem] h-[4.5rem] rounded-full object-cover", loading: "lazy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: r.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: r.role })
        ] })
      ] })
    ] }) }, r.name)) })
  ] }) });
}
function FinalCTA() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden py-28", style: {
    background: "#050d0a"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroBg, alt: "", width: 1920, height: 1080, loading: "lazy", className: "absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none select-none", "aria-hidden": "true" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#050d0a] via-transparent to-[#050d0a] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 max-w-2xl mx-auto px-5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollReveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl sm:text-4xl font-bold tracking-tight text-white", style: {
        lineHeight: "1.15"
      }, children: "Ready to build better habits?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-white max-w-md mx-auto", style: {
        textWrap: "pretty"
      }, children: "Join thousands of people using Emberly to build consistency, one day at a time." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/login", className: "mt-8 inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-8 py-4 text-sm font-semibold hover:bg-primary/90 transition-all duration-200 active:scale-[0.97] shadow-lg shadow-primary/25", children: [
        "Get started free",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
      ] })
    ] }) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border/40 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-6 h-6 text-foreground", strokeWidth: 2.5 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: "Emberly" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#features", className: "hover:text-foreground transition-colors", children: "Features" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#how-it-works", className: "hover:text-foreground transition-colors", children: "How it works" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#reviews", className: "hover:text-foreground transition-colors", children: "Reviews" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "hover:text-foreground transition-colors", children: "Sign in" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "hover:text-foreground transition-colors", children: "Get started" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Emberly"
    ] })
  ] }) }) });
}
function ScrollReveal({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
export {
  LandingPage as component
};
