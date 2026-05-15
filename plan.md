
# Plan: Richer Spark heatmap + Anonymous community questions

Three things in one shot:

1. Confirm "auto-mark visited" works (it already does — no code change needed).
2. Upgrade the heatmap so each answered day shows the prompt + a snippet of your reflection on hover.
3. Add a separate **Questions** space where anyone can post questions and post anonymous reflections to others' questions, with the feed auto-matched to your habits.

> Before we start: this *does* break the current "no social features" rule in project memory. I'll update that memory to reflect the new direction (anonymous-only sharing) so future work doesn't fight us.

---

## 1. Auto-mark visited (already done)

`src/routes/spark.tsx` already calls `markVisitedInCloud` (signed in) or `markSparkVisited` (local) inside its mount effect — before any save. Verified, no change needed. I'll just call it out in the response so you know.

## 2. Richer heatmap tooltips

Change `SparkHeatmap` to accept a richer entry per date, not just a state string:

```ts
type SparkHeatmapDetail = {
  state: "answered" | "visited";
  prompt?: string;
  answer?: string;
};
byDate: Record<string, SparkHeatmapDetail | undefined>
```

Tooltip composition for each square:
- **Missed** → `"Mar 12 · Missed"`
- **Visited** → `"Mar 12 · Visited"`
- **Answered** → `"Mar 12 · <prompt>\n\n<first 120 chars of answer>…"`

Native `title` attribute supports newlines, so no extra UI library needed. Update the caller in `src/routes/spark.tsx` to pass the richer shape (we already have `prompt` and `answer` for each entry on both cloud and local paths).

## 3. Community questions (anonymous-only, habit-matched)

A new top-level surface alongside Spark.

### UX

- **New tab in BottomNav:** "Questions" (icon: `MessagesSquare`). Bottom nav grows to 5 items — keep the slide indicator math generic (already done).
- **Route `/questions`:**
  - Top: filter chips = your habit categories (auto-derived). Default: "For you" (matched). Other tabs: "All", "My posts".
  - List of question cards (newest first in v1): question text, category tag, reply count, time ago, "Reply" button.
  - Floating "+ Ask" button → opens a sheet: textarea (max 280 chars) + category dropdown (defaults to your most-used category).
- **Question detail `/questions/$id`:**
  - The question at top.
  - Reply composer (textarea, max 1000 chars) — submits as anonymous.
  - List of replies, newest first. Each reply: snippet, time ago, small "Report" link.
  - No usernames anywhere. No profile pages. No reactions in v1 (keeps moderation simple — we can add hearts later).

### Habit matching ("auto-matched from your habits")

Categories are inferred from each habit's name with a lightweight keyword map (so users don't have to tag manually):

```text
Fitness    → gym, run, walk, workout, exercise, yoga, stretch, push, lift
Reading    → read, book, kindle, audiobook
Mindfulness→ meditate, meditation, journal, breathe, gratitude
Sleep      → sleep, bed, wind down, no screens, melatonin
Nutrition  → water, eat, sugar, alcohol, vitamin, breakfast
Focus      → deep work, code, study, learn, write, plan
Other      → fallback
```

Function `inferCategories(habits): string[]` returns the unique set of categories the user has at least one habit in. The "For you" feed = questions whose category is in that set.

If the user has zero habits → "For you" shows the "All" feed.

### Data model

Two tables. RLS enforces anonymity (no `user_id` is ever read by the client; it's only stored to prevent abuse and let users delete their own posts).

```sql
-- Categories are stored as plain text, validated by trigger against an enum-like CHECK
create table public.community_questions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null,
  body text not null check (char_length(body) between 3 and 280),
  reply_count int not null default 0,
  created_at timestamptz not null default now()
);

create table public.community_replies (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.community_questions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 3 and 1000),
  created_at timestamptz not null default now()
);

-- RLS: everyone authenticated can read everything (no user_id leaked via SELECT projections in client)
-- But we KEEP user_id server-side for: ownership-based delete, abuse rate-limiting, future moderation.
```

RLS policies:
- `community_questions`
  - SELECT: `auth.role() = 'authenticated'` (no user_id exposed via the client query — we always `.select('id, category, body, reply_count, created_at')`)
  - INSERT: `auth.uid() = user_id`
  - DELETE: `auth.uid() = user_id` (author can delete own post)
  - UPDATE: none (no editing in v1; keeps anonymity simple)
- `community_replies` mirrors the above.
- Trigger to bump/decrement `reply_count` on insert/delete of replies.

### Anonymity guarantees

- Client code **never selects `user_id`** from these tables. All hooks use explicit column lists.
- No realtime subscription on `user_id`.
- "My posts" view filters by `user_id = auth.uid()` server-side (the user's own id, never anyone else's).
- We add a security memory entry stating: "community_questions/replies are intentionally readable by all authenticated users; user_id is server-only and must never be projected to clients."

### Abuse / safety (v1, lightweight)

- 280-char questions, 1000-char replies (size + a CHECK constraint).
- Client-side rate limit: max 5 posts/min via a simple timestamp in localStorage. Real rate-limiting later if needed.
- "Report" link on every post → inserts into a `community_reports` table (id, target_type, target_id, reporter_id, reason, created_at). Admin review out of scope; we just collect.
- Profanity / spam moderation: out of scope for v1, noted as a follow-up.

### Files to add / change

```text
src/routes/questions.tsx              # list + filters + ask sheet
src/routes/questions.$id.tsx          # question detail + replies
src/lib/community.ts                  # category inference, fetch/post/reply, report
src/components/QuestionCard.tsx
src/components/AskQuestionSheet.tsx
src/components/ReplyComposer.tsx
src/components/BottomNav.tsx          # add Questions item
src/components/SparkHeatmap.tsx       # richer tooltip
src/routes/spark.tsx                  # pass prompt/answer into heatmap
mem://style/branding-and-color-palette  (no change)
mem://core (update)                   # remove "no social features"
```

### Out of scope (we'll do later if you want)

- Question categories editor (manual category override per habit)
- Reactions / hearts / saves
- Sorting (popular, unanswered) — v1 is just "newest"
- Full-text search across questions
- Human moderation tooling
- AI moderation pass before posting

---

## What I need from you

Just confirm this plan and I'll build it in one pass: tooltip upgrade, new tables + RLS migration, `/questions` and `/questions/$id` routes, new BottomNav item, and the memory update.
