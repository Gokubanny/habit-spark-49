import { c as reactExports, q as jsxRuntimeExports } from "./worker-entry-yMGtmKpA.js";
import { t as toast, u as useNavigate } from "./router-DljChdAV.js";
import { u as useAuth, B as BottomNav, A as AddHabitSheet, g as getHabits, a as getLogs, s as saveHabits, b as saveLogs } from "./use-auth-SxBD0S2x.js";
import { U as UserAvatar, u as useProfile, g as getNotificationPermission, i as isNotificationSupported, L as Leaf, r as requestNotificationPermission, a as rescheduleAllReminders } from "./UserAvatar-CoNHAhap.js";
import { c as createLucideIcon } from "./createLucideIcon-BDWwxIey.js";
import { T as Trash2 } from "./trash-2-CWR6Tq_E.js";
import { M as Moon } from "./moon-BSZMUOGe.js";
import { B as Bell } from "./sparkles-C1VBMXel.js";
import "node:events";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "./utils-Bz4m9VPB.js";
const __iconNode$9 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",
      key: "178tsu"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05", key: "1hqiys" }]
];
const BellOff = createLucideIcon("bell-off", __iconNode$9);
const __iconNode$8 = [
  [
    "path",
    {
      d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",
      key: "18u6gg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode$8);
const __iconNode$7 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$7);
const __iconNode$6 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$6);
const __iconNode$5 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$5);
const __iconNode$4 = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$3);
const __iconNode$2 = [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
];
const Monitor = createLucideIcon("monitor", __iconNode$2);
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
];
const Sun = createLucideIcon("sun", __iconNode$1);
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
const THEME_KEY = "continuum_theme";
function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function applyTheme(theme) {
  if (typeof document === "undefined") return;
  const resolved = theme === "system" ? getSystemTheme() : theme;
  document.documentElement.classList.toggle("dark", resolved === "dark");
}
function useTheme() {
  const [theme, setThemeState] = reactExports.useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem(THEME_KEY) || "light";
  });
  const setTheme = reactExports.useCallback((t) => {
    setThemeState(t);
    localStorage.setItem(THEME_KEY, t);
    applyTheme(t);
  }, []);
  reactExports.useEffect(() => {
    applyTheme(theme);
    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [theme]);
  const resolved = theme === "system" ? getSystemTheme() : theme;
  return { theme, resolved, setTheme };
}
function AvatarUploader({ userId, email, displayName, avatarUrl, onChange }) {
  const inputRef = reactExports.useRef(null);
  const [busy, setBusy] = reactExports.useState(false);
  const [preview, setPreview] = reactExports.useState(null);
  const handleFile = async (file) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image must be under 4MB");
      return;
    }
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setBusy(true);
    try {
      const { supabase } = await import("./client-DZSvFFWO.js");
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = `${userId}/avatar-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("avatars").upload(path, file, { upsert: true, contentType: file.type, cacheControl: "3600" });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from("avatars").getPublicUrl(path);
      const publicUrl = pub.publicUrl;
      const { error: profErr } = await supabase.from("profiles").upsert({ id: userId, avatar_url: publicUrl }, { onConflict: "id" });
      if (profErr) throw profErr;
      toast.success("Avatar updated");
      onChange();
    } catch (err) {
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
      const { supabase } = await import("./client-DZSvFFWO.js");
      const { error } = await supabase.from("profiles").upsert({ id: userId, avatar_url: null }, { onConflict: "id" });
      if (error) throw error;
      setPreview(null);
      toast.success("Avatar removed");
      onChange();
    } catch (err) {
      toast.error(err.message || "Could not remove avatar");
    } finally {
      setBusy(false);
    }
  };
  const shownUrl = preview ?? avatarUrl ?? null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 px-5 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(UserAvatar, { url: shownUrl, email, name: displayName, size: 64 }),
      busy && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-black/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 text-white animate-spin" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: displayName || email || "Your profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: "PNG or JPG · up to 4MB" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            disabled: busy,
            onClick: () => inputRef.current?.click(),
            className: "inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold hover:bg-primary/90 transition active:scale-[0.97] disabled:opacity-50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-3.5 h-3.5" }),
              avatarUrl ? "Change" : "Upload"
            ]
          }
        ),
        avatarUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            disabled: busy,
            onClick: handleRemove,
            className: "inline-flex items-center gap-1.5 rounded-lg bg-muted text-muted-foreground px-3 py-1.5 text-xs font-semibold hover:text-foreground transition active:scale-[0.97] disabled:opacity-50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
              "Remove"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: inputRef,
        type: "file",
        accept: "image/png,image/jpeg,image/webp",
        className: "hidden",
        onChange: (e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
        }
      }
    )
  ] });
}
function SettingsPage() {
  const {
    theme,
    setTheme
  } = useTheme();
  const {
    user,
    signOut
  } = useAuth();
  const {
    profile,
    refresh: refreshProfile
  } = useProfile(user?.id ?? null);
  const navigate = useNavigate();
  const [sheetOpen, setSheetOpen] = reactExports.useState(false);
  const [confirmClear, setConfirmClear] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const [notifPermission, setNotifPermission] = reactExports.useState(getNotificationPermission());
  const handleExport = () => {
    const data = {
      habits: getHabits(),
      logs: getLogs(),
      exportedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `continuum-backup-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Data exported successfully");
  };
  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result);
        if (data.habits && Array.isArray(data.habits)) {
          saveHabits(data.habits);
        }
        if (data.logs && Array.isArray(data.logs)) {
          saveLogs(data.logs);
        }
        toast.success("Data imported successfully");
      } catch {
        toast.error("Invalid backup file");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleClear = async () => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    saveHabits([]);
    saveLogs([]);
    if (user) {
      try {
        const {
          supabase
        } = await import("./client-DZSvFFWO.js");
        await supabase.from("habit_logs").delete().eq("user_id", user.id);
        await supabase.from("habits").delete().eq("user_id", user.id);
      } catch (err) {
        console.error("Failed to clear cloud data:", err);
        toast.error("Failed to clear cloud data");
        setConfirmClear(false);
        return;
      }
    }
    setConfirmClear(false);
    toast.success("All data cleared");
  };
  const handleAdd = (habit) => {
    const updated = [...getHabits(), habit];
    saveHabits(updated);
  };
  const handleNotificationToggle = async () => {
    if (notifPermission === "granted") {
      toast("To disable notifications, use your browser settings");
      return;
    }
    const result = await requestNotificationPermission();
    setNotifPermission(result);
    if (result === "granted") {
      toast.success("Notifications enabled");
      rescheduleAllReminders(getHabits());
    } else if (result === "denied") {
      toast.error("Notifications blocked by browser");
    }
  };
  const handleSignOut = async () => {
    await signOut();
    navigate({
      to: "/login"
    });
    toast.success("Signed out");
  };
  const themeOptions = [{
    value: "light",
    icon: Sun,
    label: "Light"
  }, {
    value: "dark",
    icon: Moon,
    label: "Dark"
  }, {
    value: "system",
    icon: Monitor,
    label: "Auto"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen pb-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-5 pt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-up-blur", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-muted-foreground font-medium", children: "Preferences" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold text-foreground mt-0.5 tracking-tight", style: {
          lineHeight: "1.2"
        }, children: "Settings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "animate-fade-up-blur", style: {
          animationDelay: "40ms"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[11px] font-medium text-muted-foreground mb-2.5 uppercase tracking-wider", children: "Account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)] overflow-hidden", children: user ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarUploader, { userId: user.id, email: user.email, displayName: profile?.display_name, avatarUrl: profile?.avatar_url, onChange: refreshProfile }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: user.email }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: "Syncing to cloud" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSignOut, className: "flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted text-sm text-muted-foreground hover:text-foreground transition-colors active:scale-95", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3.5 h-3.5" }),
                "Sign out"
              ] })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigate({
            to: "/login"
          }), className: "w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/30 transition-colors active:scale-[0.99]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4 text-primary flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Sign in" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: "Sync your habits across devices" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground/40 flex-shrink-0" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "animate-fade-up-blur", style: {
          animationDelay: "60ms"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[11px] font-medium text-muted-foreground mb-2.5 uppercase tracking-wider", children: "Appearance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)] p-1.5 flex gap-1", children: themeOptions.map(({
            value,
            icon: Icon,
            label
          }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTheme(value), className: `flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-300 active:scale-[0.97] ${theme === value ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 transition-transform duration-300 ${theme === value ? "rotate-0" : ""}` }),
            label
          ] }, value)) })
        ] }),
        isNotificationSupported() && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "animate-fade-up-blur", style: {
          animationDelay: "90ms"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[11px] font-medium text-muted-foreground mb-2.5 uppercase tracking-wider", children: "Notifications" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleNotificationToggle, className: "w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/30 transition-colors active:scale-[0.99]", children: [
            notifPermission === "granted" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-primary flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: notifPermission === "granted" ? "Notifications enabled" : "Enable notifications" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: notifPermission === "granted" ? "Reminders will fire at scheduled times" : notifPermission === "denied" ? "Blocked — update in browser settings" : "Get reminded to complete your habits" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-10 h-6 rounded-full transition-colors ${notifPermission === "granted" ? "bg-primary" : "bg-muted"} flex items-center px-0.5`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${notifPermission === "granted" ? "translate-x-4" : "translate-x-0"}` }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "animate-fade-up-blur", style: {
          animationDelay: "120ms"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[11px] font-medium text-muted-foreground mb-2.5 uppercase tracking-wider", children: "Data" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)] divide-y divide-border/50 overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleExport, className: "w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/30 transition-colors active:scale-[0.99]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 text-primary flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Export data" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: "Download your habits as JSON" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground/40 flex-shrink-0" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => fileInputRef.current?.click(), className: "w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/30 transition-colors active:scale-[0.99]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 text-primary flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Import data" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: "Restore from a JSON backup" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground/40 flex-shrink-0" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileInputRef, type: "file", accept: ".json", className: "hidden", onChange: handleImport }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleClear, className: "w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-destructive/5 transition-colors active:scale-[0.99]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 text-destructive flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-destructive", children: confirmClear ? "Tap again to confirm" : "Clear all data" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: confirmClear ? "This cannot be undone" : "Remove all habits and logs" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "animate-fade-up-blur", style: {
          animationDelay: "180ms"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[11px] font-medium text-muted-foreground mb-2.5 uppercase tracking-wider", children: "About" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)] px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-5 h-5 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Emberly" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: "Version 1.0.0 · Built with care" })
            ] })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, { onAddClick: () => setSheetOpen(true) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddHabitSheet, { open: sheetOpen, onClose: () => setSheetOpen(false), onAdd: handleAdd })
  ] });
}
export {
  SettingsPage as component
};
