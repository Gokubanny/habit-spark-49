// Daily Spark — quotes, questions, gists rotating once per day.

export type SparkType = "quote" | "question" | "gist";

export interface SparkItem {
  type: SparkType;
  text: string;
  attribution?: string;
}

export const QUOTES: { text: string; attribution: string }[] = [
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", attribution: "Aristotle" },
  { text: "Small daily improvements over time lead to stunning results.", attribution: "Robin Sharma" },
  { text: "Motivation gets you going, but discipline keeps you growing.", attribution: "John C. Maxwell" },
  { text: "You do not rise to the level of your goals. You fall to the level of your systems.", attribution: "James Clear" },
  { text: "The secret of your future is hidden in your daily routine.", attribution: "Mike Murdock" },
  { text: "Success is the sum of small efforts repeated day in and day out.", attribution: "Robert Collier" },
  { text: "How we spend our days is, of course, how we spend our lives.", attribution: "Annie Dillard" },
  { text: "Discipline is choosing between what you want now and what you want most.", attribution: "Abraham Lincoln" },
  { text: "Don't count the days, make the days count.", attribution: "Muhammad Ali" },
  { text: "Quality is not an act, it is a habit.", attribution: "Aristotle" },
  { text: "The chains of habit are too light to be felt until they are too heavy to be broken.", attribution: "Warren Buffett" },
  { text: "First we make our habits, then our habits make us.", attribution: "John Dryden" },
  { text: "You'll never change your life until you change something you do daily.", attribution: "John C. Maxwell" },
  { text: "Habit is the intersection of knowledge, skill, and desire.", attribution: "Stephen Covey" },
  { text: "Action is the foundational key to all success.", attribution: "Pablo Picasso" },
  { text: "A river cuts through rock not because of its power, but its persistence.", attribution: "James N. Watkins" },
  { text: "The only way to do great work is to love what you do.", attribution: "Steve Jobs" },
  { text: "Tiny changes, remarkable results.", attribution: "James Clear" },
  { text: "What you do every day matters more than what you do once in a while.", attribution: "Gretchen Rubin" },
  { text: "Be stubborn about your goals, flexible about your methods.", attribution: "Unknown" },
];

export const QUESTIONS: string[] = [
  "What's one small win you had today?",
  "What habit, if you stuck to it for a year, would change everything?",
  "What's one thing you can let go of this week?",
  "Where did you spend energy today that you'd take back if you could?",
  "What would your future self thank you for starting today?",
  "What does a perfect tomorrow look like — and what's one step toward it?",
  "What are you avoiding, and what would happen if you faced it?",
  "Who or what made you smile today?",
  "If you could only keep three habits, which would they be?",
  "What did you learn about yourself this week?",
  "What's draining your energy lately?",
  "What's something you're proud of from the past 30 days?",
  "What's one boundary you need to set?",
  "What would make today feel meaningful?",
  "What's a belief about yourself you're ready to update?",
  "What's worth doing slowly today?",
  "What's one thing you'd do differently if no one was watching?",
  "What kind of person are your habits shaping you into?",
  "What's a question you've been avoiding asking yourself?",
  "What did rest look like for you this week?",
];

export const GISTS: string[] = [
  "It takes an average of 66 days for a new behavior to feel automatic — not 21. Be patient with yourself.",
  "Habits stick best when stacked onto something you already do. Try: 'After my morning coffee, I'll…'",
  "Missing one day rarely breaks a habit. Missing two starts a new one. Don't miss twice.",
  "Your environment shapes your behavior more than willpower. Make the right thing the easy thing.",
  "Identity-based habits stick longer: don't 'try to read', become 'a reader'.",
  "Tracking a habit makes you 2x more likely to follow through. You're already ahead.",
  "The 2-minute rule: shrink any new habit until it takes less than 2 minutes to start.",
  "Streaks work because of loss aversion — we feel losing twice as strongly as gaining.",
  "Dopamine is released in anticipation of reward, not after. Make starting feel exciting.",
  "Sleep is a habit multiplier. Every habit gets harder when you're under-rested.",
  "Friction is the enemy of consistency. Lay out your gym clothes the night before.",
  "Your brain forms habits in the basal ganglia — the same region that handles emotions and memory.",
  "Public commitments are 65% more likely to be kept. Tell someone what you're working on.",
  "Cravings, not goals, drive most behavior. Design habits that feel good, not just useful.",
  "Replacing a habit is far easier than removing one. Always swap, don't subtract.",
  "Most habit failures aren't motivation problems — they're design problems.",
  "Compound interest works for habits too. 1% better daily = 37x improvement in a year.",
  "The cue–routine–reward loop powers every habit you have. Identify the cue first.",
  "Visual progress (a calendar, a chain) is one of the strongest motivators we know.",
  "You don't need to be perfect. You just need to show up more often than not.",
];

// Deterministic daily picker — same date always returns the same Spark.
function hashDate(dateKey: string): number {
  let h = 0;
  for (let i = 0; i < dateKey.length; i++) {
    h = (h * 31 + dateKey.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function getSparkForDate(dateKey: string): SparkItem {
  const h = hashDate(dateKey);
  const slot = h % 3;
  if (slot === 0) {
    const q = QUOTES[h % QUOTES.length];
    return { type: "quote", text: q.text, attribution: q.attribution };
  }
  if (slot === 1) {
    return { type: "question", text: QUESTIONS[h % QUESTIONS.length] };
  }
  return { type: "gist", text: GISTS[h % GISTS.length] };
}

export function todayDateKey(): string {
  return new Date().toISOString().split("T")[0];
}

// ----- Local storage for answers + spark streak -----

const ANSWERS_KEY = "dailymint_spark_answers";
const STREAK_KEY = "dailymint_spark_streak";
const VISITED_KEY = "dailymint_spark_visited"; // dates user opened spark
const BANNER_DISMISS_KEY = "dailymint_spark_banner_dismissed";

export interface SparkAnswer {
  date: string;
  question: string;
  answer: string;
}

export function getAnswers(): SparkAnswer[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(ANSWERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveAnswer(date: string, question: string, answer: string) {
  const all = getAnswers().filter((a) => a.date !== date);
  all.push({ date, question, answer });
  localStorage.setItem(ANSWERS_KEY, JSON.stringify(all));
}

export function getAnswerForDate(date: string): SparkAnswer | undefined {
  return getAnswers().find((a) => a.date === date);
}

export function getVisitedDates(): string[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(VISITED_KEY);
  return raw ? JSON.parse(raw) : [];
}

function getVisited(): string[] {
  return getVisitedDates();
}

export function markSparkVisited(date: string) {
  const visited = getVisited();
  if (!visited.includes(date)) {
    visited.push(date);
    localStorage.setItem(VISITED_KEY, JSON.stringify(visited));
  }
}

export function computeStreakFromDates(dates: Iterable<string>): number {
  const visited = new Set(dates);
  const today = todayDateKey();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yKey = yesterday.toISOString().split("T")[0];

  if (!visited.has(today) && !visited.has(yKey)) return 0;

  let streak = 0;
  const cursor = new Date();
  if (!visited.has(today)) cursor.setDate(cursor.getDate() - 1);

  while (true) {
    const key = cursor.toISOString().split("T")[0];
    if (visited.has(key)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else break;
  }
  return streak;
}

export function getSparkStreak(): number {
  return computeStreakFromDates(getVisited());
}

export function isBannerDismissedToday(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(BANNER_DISMISS_KEY) === todayDateKey();
}

export function dismissBannerToday() {
  localStorage.setItem(BANNER_DISMISS_KEY, todayDateKey());
}
