import type { Habit } from "./habits";

export const CATEGORIES = [
  "Fitness", "Reading", "Mindfulness", "Sleep", "Nutrition", "Focus", "Other",
] as const;
export type Category = typeof CATEGORIES[number];

const KEYWORDS: Record<Exclude<Category, "Other">, string[]> = {
  Fitness: ["gym", "run", "walk", "workout", "exercise", "yoga", "stretch", "push", "lift", "cardio", "bike"],
  Reading: ["read", "book", "kindle", "audiobook", "pages"],
  Mindfulness: ["meditat", "journal", "breathe", "gratitude", "mindful", "reflect"],
  Sleep: ["sleep", "bed", "wind down", "no screens", "melatonin"],
  Nutrition: ["water", "eat", "sugar", "alcohol", "vitamin", "breakfast", "diet", "fruit", "veg"],
  Focus: ["deep work", "code", "study", "learn", "write", "plan", "focus"],
};

export function inferCategoryForName(name: string): Category {
  const n = name.toLowerCase();
  for (const cat of Object.keys(KEYWORDS) as Array<keyof typeof KEYWORDS>) {
    if (KEYWORDS[cat].some((k) => n.includes(k))) return cat;
  }
  return "Other";
}

export function inferUserCategories(habits: Habit[]): Category[] {
  const set = new Set<Category>();
  for (const h of habits) set.add(inferCategoryForName(h.name));
  return Array.from(set);
}

/** Most-used category, or "Other" if no habits. */
export function pickDefaultCategory(habits: Habit[]): Category {
  if (habits.length === 0) return "Other";
  const counts = new Map<Category, number>();
  for (const h of habits) {
    const c = inferCategoryForName(h.name);
    counts.set(c, (counts.get(c) ?? 0) + 1);
  }
  let best: Category = "Other";
  let bestN = -1;
  for (const [c, n] of counts) {
    if (n > bestN) { best = c; bestN = n; }
  }
  return best;
}

// ---- Data access ----

async function getSupabase() {
  const { supabase } = await import("@/integrations/supabase/client");
  return supabase;
}

export interface CommunityQuestion {
  id: string;
  category: Category;
  body: string;
  reply_count: number;
  created_at: string;
  is_mine?: boolean;
}

export interface CommunityReply {
  id: string;
  body: string;
  created_at: string;
  is_mine?: boolean;
}

const RATE_KEY = "dailymint_community_post_times";
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

function checkRateLimit(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = localStorage.getItem(RATE_KEY);
    const now = Date.now();
    const arr: number[] = raw ? JSON.parse(raw) : [];
    const recent = arr.filter((t) => now - t < RATE_WINDOW_MS);
    if (recent.length >= RATE_LIMIT) return false;
    recent.push(now);
    localStorage.setItem(RATE_KEY, JSON.stringify(recent));
    return true;
  } catch {
    return true;
  }
}

export async function fetchQuestions(opts: {
  categories?: Category[];
  mineOnly?: boolean;
  userId?: string;
  limit?: number;
}): Promise<CommunityQuestion[]> {
  const supabase = await getSupabase();
  let query = supabase
    .from("community_questions")
    .select("id, category, body, reply_count, created_at, user_id")
    .order("created_at", { ascending: false })
    .limit(opts.limit ?? 100);

  if (opts.categories && opts.categories.length > 0) {
    query = query.in("category", opts.categories);
  }
  if (opts.mineOnly && opts.userId) {
    query = query.eq("user_id", opts.userId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data || []).map((row: any) => ({
    id: row.id,
    category: row.category,
    body: row.body,
    reply_count: row.reply_count,
    created_at: row.created_at,
    is_mine: opts.userId ? row.user_id === opts.userId : false,
  }));
}

export async function fetchQuestion(id: string, userId?: string): Promise<CommunityQuestion | null> {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("community_questions")
    .select("id, category, body, reply_count, created_at, user_id")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return {
    id: data.id, category: data.category as Category, body: data.body,
    reply_count: data.reply_count, created_at: data.created_at,
    is_mine: userId ? (data as any).user_id === userId : false,
  };
}

export async function fetchReplies(questionId: string, userId?: string): Promise<CommunityReply[]> {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("community_replies")
    .select("id, body, created_at, user_id")
    .eq("question_id", questionId)
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) throw error;
  return (data || []).map((r: any) => ({
    id: r.id, body: r.body, created_at: r.created_at,
    is_mine: userId ? r.user_id === userId : false,
  }));
}

export async function postQuestion(userId: string, category: Category, body: string): Promise<string> {
  const text = body.trim();
  if (text.length < 3 || text.length > 280) throw new Error("Question must be 3–280 characters");
  if (!checkRateLimit()) throw new Error("You're posting too quickly. Try again in a moment.");
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("community_questions")
    .insert({ user_id: userId, category, body: text })
    .select("id")
    .single();
  if (error) throw error;
  return data.id;
}

export async function postReply(userId: string, questionId: string, body: string): Promise<void> {
  const text = body.trim();
  if (text.length < 3 || text.length > 1000) throw new Error("Reply must be 3–1000 characters");
  if (!checkRateLimit()) throw new Error("You're posting too quickly. Try again in a moment.");
  const supabase = await getSupabase();
  const { error } = await supabase
    .from("community_replies")
    .insert({ user_id: userId, question_id: questionId, body: text });
  if (error) throw error;
}

export async function deleteQuestion(id: string): Promise<void> {
  const supabase = await getSupabase();
  const { error } = await supabase.from("community_questions").delete().eq("id", id);
  if (error) throw error;
}

export async function deleteReply(id: string): Promise<void> {
  const supabase = await getSupabase();
  const { error } = await supabase.from("community_replies").delete().eq("id", id);
  if (error) throw error;
}

export async function reportPost(
  userId: string,
  targetType: "question" | "reply",
  targetId: string,
  reason?: string,
): Promise<void> {
  const supabase = await getSupabase();
  const { error } = await supabase.from("community_reports").insert({
    reporter_id: userId, target_type: targetType, target_id: targetId, reason: reason ?? null,
  });
  if (error) throw error;
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
