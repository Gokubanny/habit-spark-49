import { c as createLucideIcon } from "./createLucideIcon-DIdLOON3.js";
const __iconNode = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
      key: "1sd12s"
    }
  ]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode);
const CATEGORIES = [
  "Fitness",
  "Reading",
  "Mindfulness",
  "Sleep",
  "Nutrition",
  "Focus",
  "Other"
];
const KEYWORDS = {
  Fitness: ["gym", "run", "walk", "workout", "exercise", "yoga", "stretch", "push", "lift", "cardio", "bike"],
  Reading: ["read", "book", "kindle", "audiobook", "pages"],
  Mindfulness: ["meditat", "journal", "breathe", "gratitude", "mindful", "reflect"],
  Sleep: ["sleep", "bed", "wind down", "no screens", "melatonin"],
  Nutrition: ["water", "eat", "sugar", "alcohol", "vitamin", "breakfast", "diet", "fruit", "veg"],
  Focus: ["deep work", "code", "study", "learn", "write", "plan", "focus"]
};
function inferCategoryForName(name) {
  const n = name.toLowerCase();
  for (const cat of Object.keys(KEYWORDS)) {
    if (KEYWORDS[cat].some((k) => n.includes(k))) return cat;
  }
  return "Other";
}
function inferUserCategories(habits) {
  const set = /* @__PURE__ */ new Set();
  for (const h of habits) set.add(inferCategoryForName(h.name));
  return Array.from(set);
}
function pickDefaultCategory(habits) {
  if (habits.length === 0) return "Other";
  const counts = /* @__PURE__ */ new Map();
  for (const h of habits) {
    const c = inferCategoryForName(h.name);
    counts.set(c, (counts.get(c) ?? 0) + 1);
  }
  let best = "Other";
  let bestN = -1;
  for (const [c, n] of counts) {
    if (n > bestN) {
      best = c;
      bestN = n;
    }
  }
  return best;
}
async function getSupabase() {
  const { supabase } = await import("./client-DZSvFFWO.js");
  return supabase;
}
const RATE_KEY = "dailymint_community_post_times";
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 6e4;
function checkRateLimit() {
  if (typeof window === "undefined") return true;
  try {
    const raw = localStorage.getItem(RATE_KEY);
    const now = Date.now();
    const arr = raw ? JSON.parse(raw) : [];
    const recent = arr.filter((t) => now - t < RATE_WINDOW_MS);
    if (recent.length >= RATE_LIMIT) return false;
    recent.push(now);
    localStorage.setItem(RATE_KEY, JSON.stringify(recent));
    return true;
  } catch {
    return true;
  }
}
async function fetchQuestions(opts) {
  const supabase = await getSupabase();
  let query = supabase.from("community_questions").select("id, category, body, reply_count, created_at, user_id").order("created_at", { ascending: false }).limit(opts.limit ?? 100);
  if (opts.categories && opts.categories.length > 0) {
    query = query.in("category", opts.categories);
  }
  if (opts.mineOnly && opts.userId) {
    query = query.eq("user_id", opts.userId);
  }
  const { data, error } = await query;
  if (error) throw error;
  return (data || []).map((row) => ({
    id: row.id,
    category: row.category,
    body: row.body,
    reply_count: row.reply_count,
    created_at: row.created_at,
    is_mine: opts.userId ? row.user_id === opts.userId : false
  }));
}
async function fetchQuestion(id, userId) {
  const supabase = await getSupabase();
  const { data, error } = await supabase.from("community_questions").select("id, category, body, reply_count, created_at, user_id").eq("id", id).maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return {
    id: data.id,
    category: data.category,
    body: data.body,
    reply_count: data.reply_count,
    created_at: data.created_at,
    is_mine: userId ? data.user_id === userId : false
  };
}
async function fetchReplies(questionId, userId) {
  const supabase = await getSupabase();
  const { data, error } = await supabase.from("community_replies").select("id, body, created_at, user_id").eq("question_id", questionId).order("created_at", { ascending: false }).limit(200);
  if (error) throw error;
  return (data || []).map((r) => ({
    id: r.id,
    body: r.body,
    created_at: r.created_at,
    is_mine: userId ? r.user_id === userId : false
  }));
}
async function postQuestion(userId, category, body) {
  const text = body.trim();
  if (text.length < 3 || text.length > 280) throw new Error("Question must be 3–280 characters");
  if (!checkRateLimit()) throw new Error("You're posting too quickly. Try again in a moment.");
  const supabase = await getSupabase();
  const { data, error } = await supabase.from("community_questions").insert({ user_id: userId, category, body: text }).select("id").single();
  if (error) throw error;
  return data.id;
}
async function postReply(userId, questionId, body) {
  const text = body.trim();
  if (text.length < 3 || text.length > 1e3) throw new Error("Reply must be 3–1000 characters");
  if (!checkRateLimit()) throw new Error("You're posting too quickly. Try again in a moment.");
  const supabase = await getSupabase();
  const { error } = await supabase.from("community_replies").insert({ user_id: userId, question_id: questionId, body: text });
  if (error) throw error;
}
async function deleteQuestion(id) {
  const supabase = await getSupabase();
  const { error } = await supabase.from("community_questions").delete().eq("id", id);
  if (error) throw error;
}
async function deleteReply(id) {
  const supabase = await getSupabase();
  const { error } = await supabase.from("community_replies").delete().eq("id", id);
  if (error) throw error;
}
async function reportPost(userId, targetType, targetId, reason) {
  const supabase = await getSupabase();
  const { error } = await supabase.from("community_reports").insert({
    reporter_id: userId,
    target_type: targetType,
    target_id: targetId,
    reason: null
  });
  if (error) throw error;
}
function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const s = Math.floor(diff / 1e3);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString(void 0, { month: "short", day: "numeric" });
}
export {
  CATEGORIES as C,
  MessageCircle as M,
  postQuestion as a,
  fetchQuestion as b,
  fetchReplies as c,
  deleteQuestion as d,
  postReply as e,
  fetchQuestions as f,
  deleteReply as g,
  inferUserCategories as i,
  pickDefaultCategory as p,
  reportPost as r,
  timeAgo as t
};
