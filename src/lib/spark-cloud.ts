import type { SparkType } from "./spark";

async function getSupabase() {
  const { supabase } = await import("@/integrations/supabase/client");
  return supabase;
}

export interface CloudSparkEntry {
  date: string;
  spark_type: SparkType;
  prompt: string;
  answer: string | null;
  visited: boolean;
}

export async function fetchSparkEntries(userId: string): Promise<CloudSparkEntry[]> {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("spark_entries")
    .select("date, spark_type, prompt, answer, visited")
    .eq("user_id", userId)
    .order("date", { ascending: false });
  if (error) throw error;
  return (data || []) as CloudSparkEntry[];
}

/** Mark today as visited (insert if missing). */
export async function markVisitedInCloud(
  userId: string,
  date: string,
  sparkType: SparkType,
  prompt: string,
): Promise<void> {
  const supabase = await getSupabase();
  const { error } = await supabase
    .from("spark_entries")
    .upsert(
      { user_id: userId, date, spark_type: sparkType, prompt, visited: true },
      { onConflict: "user_id,date" },
    );
  if (error) throw error;
}

export async function saveAnswerInCloud(
  userId: string,
  date: string,
  sparkType: SparkType,
  prompt: string,
  answer: string,
): Promise<void> {
  const supabase = await getSupabase();
  const { error } = await supabase
    .from("spark_entries")
    .upsert(
      { user_id: userId, date, spark_type: sparkType, prompt, answer, visited: true },
      { onConflict: "user_id,date" },
    );
  if (error) throw error;
}

export async function seedSampleEntries(userId: string): Promise<number> {
  const supabase = await getSupabase();
  const today = new Date();
  const samples = [
    { offset: 1, type: "question" as SparkType, prompt: "What's one small win you had today?", answer: "Took a 20-minute walk before lunch instead of doomscrolling. Felt clearer the rest of the afternoon." },
    { offset: 3, type: "quote" as SparkType, prompt: "Tiny changes, remarkable results. — James Clear", answer: "Reminder to keep my reading habit at just 5 pages — small enough that I never skip it." },
    { offset: 5, type: "gist" as SparkType, prompt: "Missing one day rarely breaks a habit. Missing two starts a new one. Don't miss twice.", answer: "I missed the gym yesterday. Going today even if it's just 15 minutes. No two in a row." },
    { offset: 8, type: "question" as SparkType, prompt: "What would your future self thank you for starting today?", answer: "Going to bed by 11pm. My mornings have been a mess and I know exactly why." },
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
      visited: true,
    };
  });

  const { error, count } = await supabase
    .from("spark_entries")
    .upsert(rows, { onConflict: "user_id,date", count: "exact" });
  if (error) throw error;
  return count ?? rows.length;
}
