# Update Landing Page Features Section

## Goal
Refresh the Features section on the Emberly landing page to prominently showcase the four new user-facing features that have been built: **Avatar Profiles**, **Real-time Sync**, **Community Questions**, and **Daily Spark**.

## Current State
The Features section in `src/routes/index.tsx` lists 6 cards:
1. Streak tracking
2. Calendar heatmap
3. Smart insights
4. Gentle reminders
5. Dark mode
6. Cloud sync

## Plan

### 1. Expand Features Array
Add 4 new feature cards to the existing `features` array in `src/routes/index.tsx`:

| Feature | Icon (Lucide) | Description |
|---------|---------------|-------------|
| Avatar profiles | `UserCircle` | Upload a profile photo and see it in your app header and settings. |
| Real-time sync | `Zap` | Changes sync instantly across all your devices — no refresh needed. |
| Community Questions | `MessagesSquare` | Ask and browse anonymous questions from fellow habit builders. |
| Daily Spark | `Sparkles` | A daily quote, question, or insight to spark reflection and momentum. |

The grid will grow from 6 to 8 cards (4 rows × 2 columns on desktop), which fits naturally in the existing layout.

### 2. Update Section Headline (Optional)
Consider a subtle headline refresh if warranted, but keep the existing visual structure (app preview on the left, feature grid on the right).

### 3. Verify Build
Run a quick check to ensure the new Lucide imports resolve and the landing page renders cleanly.

## Files to Edit
- `src/routes/index.tsx` — update `features` array and imports only

## Out of Scope
- No changes to the app preview mockup
- No changes to other sections (How it works, Reviews, CTA, Footer)
- No design direction changes — follow existing card styling