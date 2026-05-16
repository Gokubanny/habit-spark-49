import { c as createLucideIcon } from "./createLucideIcon-DIdLOON3.js";
import { c as reactExports, q as jsxRuntimeExports } from "./worker-entry-C_iL5ijn.js";
import { c as cn } from "./utils-Bz4m9VPB.js";
const __iconNode = [
  [
    "path",
    {
      d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
      key: "nnexq3"
    }
  ],
  ["path", { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12", key: "mt58a7" }]
];
const Leaf = createLucideIcon("leaf", __iconNode);
const activeTimers = /* @__PURE__ */ new Map();
function isNotificationSupported() {
  return typeof window !== "undefined" && "Notification" in window;
}
function getNotificationPermission() {
  if (!isNotificationSupported()) return "unsupported";
  return Notification.permission;
}
async function requestNotificationPermission() {
  if (!isNotificationSupported()) return "unsupported";
  const result = await Notification.requestPermission();
  return result;
}
function scheduleReminder(habit) {
  if (!isNotificationSupported() || Notification.permission !== "granted") return;
  if (!habit.reminderTime) return;
  cancelReminder(habit.id);
  const [hours, minutes] = habit.reminderTime.split(":").map(Number);
  const now = /* @__PURE__ */ new Date();
  const target = /* @__PURE__ */ new Date();
  target.setHours(hours, minutes, 0, 0);
  if (target <= now) return;
  const ms = target.getTime() - now.getTime();
  const timer = setTimeout(() => {
    new Notification("Emberly reminder", {
      body: `Time to ${habit.name.toLowerCase()}`,
      icon: "/favicon.ico",
      tag: `habit-${habit.id}`
    });
    activeTimers.delete(habit.id);
  }, ms);
  activeTimers.set(habit.id, timer);
}
function cancelReminder(habitId) {
  const timer = activeTimers.get(habitId);
  if (timer) {
    clearTimeout(timer);
    activeTimers.delete(habitId);
  }
}
function rescheduleAllReminders(habits) {
  for (const [id] of activeTimers) {
    cancelReminder(id);
  }
  for (const habit of habits) {
    scheduleReminder(habit);
  }
}
function useProfile(userId) {
  const [profile, setProfile] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const refresh = reactExports.useCallback(async () => {
    if (!userId) {
      setProfile(null);
      return;
    }
    setIsLoading(true);
    try {
      const { supabase } = await import("./client-DZSvFFWO.js");
      const { data } = await supabase.from("profiles").select("id, display_name, avatar_url").eq("id", userId).maybeSingle();
      setProfile(data ?? null);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);
  reactExports.useEffect(() => {
    void refresh();
  }, [refresh]);
  return { profile, isLoading, refresh };
}
function initials(name, email) {
  const source = (name || email || "").trim();
  if (!source) return "·";
  const parts = source.split(/[\s@.]+/).filter(Boolean);
  const letters = (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
  return letters.toUpperCase() || source[0].toUpperCase();
}
function UserAvatar({ url, email, name, size = 36, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "rounded-full bg-secondary text-secondary-foreground flex items-center justify-center overflow-hidden flex-shrink-0 ring-1 ring-border",
        className
      ),
      style: { width: size, height: size, fontSize: Math.round(size * 0.38) },
      "aria-label": name || email || "Profile avatar",
      children: url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: "", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold tracking-tight", children: initials(name, email) })
    }
  );
}
export {
  Leaf as L,
  UserAvatar as U,
  rescheduleAllReminders as a,
  getNotificationPermission as g,
  isNotificationSupported as i,
  requestNotificationPermission as r,
  scheduleReminder as s,
  useProfile as u
};
