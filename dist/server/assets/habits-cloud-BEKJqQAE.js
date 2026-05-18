async function getSupabase() {
  const { supabase } = await import("./client-DZSvFFWO.js");
  return supabase;
}
async function fetchHabitsFromCloud(userId) {
  const supabase = await getSupabase();
  const { data, error } = await supabase.from("habits").select("*").eq("user_id", userId).order("position", { ascending: true });
  if (error) throw error;
  return (data || []).map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description || "",
    color: row.color,
    frequency: row.frequency || { type: "daily" },
    reminderTime: row.reminder_time || null,
    createdAt: row.created_at
  }));
}
async function fetchLogsFromCloud(userId) {
  const supabase = await getSupabase();
  const { data, error } = await supabase.from("habit_logs").select("*").eq("user_id", userId);
  if (error) throw error;
  return (data || []).map((row) => ({
    habitId: row.habit_id,
    date: row.date
  }));
}
async function saveHabitToCloud(habit, userId, position) {
  const supabase = await getSupabase();
  const { error } = await supabase.from("habits").insert({
    id: habit.id,
    user_id: userId,
    name: habit.name,
    description: habit.description,
    color: habit.color,
    frequency: habit.frequency,
    reminder_time: habit.reminderTime,
    position,
    created_at: habit.createdAt
  });
  if (error) throw error;
}
async function updateHabitInCloud(habit) {
  const supabase = await getSupabase();
  const { error } = await supabase.from("habits").update({
    name: habit.name,
    description: habit.description,
    color: habit.color,
    frequency: habit.frequency,
    reminder_time: habit.reminderTime
  }).eq("id", habit.id);
  if (error) throw error;
}
async function deleteHabitFromCloud(habitId) {
  const supabase = await getSupabase();
  const { error } = await supabase.from("habits").delete().eq("id", habitId);
  if (error) throw error;
}
async function reorderHabitsInCloud(habits) {
  const supabase = await getSupabase();
  for (let i = 0; i < habits.length; i++) {
    await supabase.from("habits").update({ position: i }).eq("id", habits[i].id);
  }
}
async function toggleLogInCloud(habitId, date, userId, exists) {
  const supabase = await getSupabase();
  if (exists) {
    const { error } = await supabase.from("habit_logs").delete().eq("habit_id", habitId).eq("date", date);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("habit_logs").insert({
      habit_id: habitId,
      user_id: userId,
      date
    });
    if (error) throw error;
  }
}
async function migrateLocalToCloud(userId) {
  const MIGRATED_KEY = "continuum_cloud_migrated";
  if (localStorage.getItem(MIGRATED_KEY) === userId) return;
  const localHabitsRaw = localStorage.getItem("continuum_habits");
  const localLogsRaw = localStorage.getItem("continuum_logs");
  if (!localHabitsRaw && !localLogsRaw) {
    localStorage.setItem(MIGRATED_KEY, userId);
    return;
  }
  const localHabits = localHabitsRaw ? JSON.parse(localHabitsRaw) : [];
  const localLogs = localLogsRaw ? JSON.parse(localLogsRaw) : [];
  const supabase = await getSupabase();
  const { data: existingHabits } = await supabase.from("habits").select("id").eq("user_id", userId).limit(1);
  if (existingHabits && existingHabits.length > 0) {
    localStorage.setItem(MIGRATED_KEY, userId);
    return;
  }
  for (let i = 0; i < localHabits.length; i++) {
    const h = localHabits[i];
    await supabase.from("habits").insert({
      id: h.id,
      user_id: userId,
      name: h.name,
      description: h.description || "",
      color: h.color,
      frequency: h.frequency || { type: "daily" },
      reminder_time: h.reminderTime || null,
      position: i,
      created_at: h.createdAt
    });
  }
  if (localLogs.length > 0) {
    const logInserts = localLogs.map((l) => ({
      habit_id: l.habitId,
      user_id: userId,
      date: l.date
    }));
    for (let i = 0; i < logInserts.length; i += 100) {
      await supabase.from("habit_logs").insert(logInserts.slice(i, i + 100));
    }
  }
  localStorage.setItem(MIGRATED_KEY, userId);
}
export {
  fetchLogsFromCloud as a,
  deleteHabitFromCloud as d,
  fetchHabitsFromCloud as f,
  migrateLocalToCloud as m,
  reorderHabitsInCloud as r,
  saveHabitToCloud as s,
  toggleLogInCloud as t,
  updateHabitInCloud as u
};
