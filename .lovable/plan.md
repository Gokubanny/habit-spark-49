
# Plan: Daily Spark — Fun Layer for DailyMint

Right now DailyMint is purely streaks + checkboxes. Let's add a lightweight **"Spark"** layer: a daily rotating feed of quotes, reflection questions, and short gists (micro-insights / fun facts) that gives users a reason to open the app even on days they've already checked off habits.

This keeps the minimalist soul of the app — no social features, no ads — while making it feel alive and rewarding.

## What we're building

### 1. New "Spark" tab
A new bottom-nav destination at `/spark` that shows **one card per day**, rotating between three content types:

- **Quote** — a short motivational/reflective quote with attribution
- **Question** — a journaling prompt the user can answer (saved locally + cloud)
- **Gist** — a 1–3 sentence "did you know" about habits, psychology, or focus

Layout: full-bleed card, large typography (Plus Jakarta Sans), subtle gradient tied to the content type, swipe/tap to reveal tomorrow's preview locked until midnight.

### 2. Reflection answers (for Questions)
When the daily Spark is a Question, the user can tap "Answer" → opens a sheet with a textarea. Saved answers are listed in a new **Journal** section inside `/insights`, grouped by month.

### 3. Spark on the home screen
Above the habits list on `/app`, add a slim **"Today's Spark"** card (collapsible, dismissible per day). Tap → opens the Spark tab. Keeps the home screen focused but gives the new feature surface area.

### 4. Content source
Two options — pick one:

- **Curated static JSON** (~150 quotes, ~80 questions, ~80 gists shipped in the bundle, deterministic daily rotation by date). Zero cost, instant, works offline.
- **AI-generated daily** via Lovable AI Gateway (`google/gemini-2.5-flash-lite`), cached per-day in the DB. Fresher, infinite variety, but needs an edge function and a tiny bit of credits per user/day.

Recommended: **start with curated JSON**, add AI generation later as a "Surprise me" button.

### 5. Streak tie-in (keeps it cohesive)
Track a separate **"Spark streak"** — consecutive days the user opened or interacted with the Spark card. Shown as a tiny flame icon next to the Spark tab. Doesn't affect habit streaks.

## Technical details

- **New route**: `src/routes/spark.tsx`
- **New components**: `SparkCard.tsx`, `AnswerSheet.tsx`, `HomeSparkBanner.tsx`
- **New content file**: `src/lib/spark-content.ts` — typed arrays of quotes/questions/gists + `getTodaySpark(dateKey)` deterministic picker (hash of date → index)
- **New table** (if we do answers + spark streak):
  - `spark_entries` — `id, user_id, date, spark_type, spark_id, answer (nullable), created_at` with RLS (`user_id = auth.uid()`)
- **Local-first**: mirror the same pattern as habits — write to `localStorage` then sync to cloud when authed
- **Bottom nav**: add Spark icon (lucide `Sparkles`) between Home and Insights in `BottomNav.tsx`
- **Branding terminology**: "Spark" fits DailyMint's mint/fresh tone; alternative names if you prefer: "Daily Drop", "Today's Mint", "Brew"

## Open questions

1. Pick a content strategy: **curated JSON now** vs **AI-generated** vs **both** (curated default + AI "surprise me" button)?
2. Should the Spark card appear as a banner on `/app` too, or only live in its own tab?
3. Name: keep **Spark**, or prefer **Daily Drop** / **Today's Mint** / your own?

Once you answer these, I'll switch to build mode and ship it.
