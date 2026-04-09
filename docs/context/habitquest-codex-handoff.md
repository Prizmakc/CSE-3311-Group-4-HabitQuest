# HabitQuest Codex Handoff

## Project intent

HabitQuest is a mobile-first, local-first self-improvement app for students and young adults. The product should reduce pressure, not increase it. The app should feel like a daily action tool, not a dashboard or productivity optimizer.

### Core product stance

- Focus on completing today.
- Keep check-ins fast and low-friction.
- Use Gentle Mode to preserve momentum when energy or consistency drops.
- Avoid noisy metrics, guilt-driven copy, and over-gamified UX.

## Current architecture

The app uses Expo Router with authenticated tabs.

### App shell

- `app/(app)/_layout.tsx`
- Bottom tabs: Today, History, Goals, Profile

### Auth

- `src/providers/AuthProvider.tsx`
- `src/lib/supabase.ts`
- Signup/login/forgot password screens in `app/(auth)/`

### Shared product data

- `src/providers/HabitQuestDataProvider.tsx`
- Local-first persistence with AsyncStorage
- Storage helpers in `src/lib/habitQuestStore.ts`

### Current section hooks

- `src/hooks/useHabitQuestToday.ts`
- `src/hooks/useHabitQuestHistory.ts`
- `src/hooks/useHabitQuestGoals.ts`

### Domain logic

- `src/domain/habitQuestSelectors.ts`
- `src/domain/habitQuestProgress.ts`
- `src/domain/habitQuestHistory.ts`

### Important note

- `useHabitQuestHome.ts` was removed earlier and should stay removed.
- `AGENTS.md` is now the authoritative source of truth.

## Implemented features

### Authentication

- Email/password login
- Signup with first name, email, password, and confirm password
- Forgot password
- Profile tab shows first name, email, and sign out

### Today

- Tap-to-cycle task states: default -> completed -> partial -> skipped -> default
- Single primary CTA: Complete Check-in
- Optional reflection modal after check-in
- No energy selector
- No inline note field
- Gentle Mode prompt before check-in when recent missed days trigger it
- Gentle Mode header behavior changes meaning:
  - Normal: standard daily completion context
  - Gentle: “One meaningful step is enough today.”

### Gentle Mode

- Stored as `gentleModeEnabled: boolean`
- Scoped behavior is only reflected in current-day success logic
- Does not rewrite goals or historical data
- `isDaySuccessful(...)` is implemented in `src/domain/habitQuestProgress.ts`

### Goals

- Goal creation with validation
- Step-based goals
- Goal editing
- Goal deletion with confirmation
- Step rename/delete in goal edit modal
- Goal setup now lives in Goals tab, not Today

### History

- Trend summary
- Recent check-ins
- Recent reflections
- Readable date formatting
- Reflection now comes from check-ins, not a separate reflection collection
- No energy display

### Developer utilities

- Seed/reset local data
- Dev-only utilities shown on the Goals screen behind `__DEV__`

## Incomplete work

- Goal Details screen does not exist yet
- No per-goal history view
- No goal/step drag-reorder
- No settings/notifications in Profile
- No Supabase-backed product tables yet
- No cross-device sync
- No polish pass on animations/motion
- Context docs may still reflect pre-v3 assumptions unless updated separately after this handoff

## Known issues and caveats

At the time of this handoff:

- `npm run typecheck` passes

Behavioral caveats:

- Legacy stored data migration merges old standalone reflections into `checkIn.reflection` by date key in `src/lib/habitQuestStore.ts`
- Older local data with note/energy fields is migrated or ignored safely, but if a user had multiple legacy reflections on the same day they may be merged into one text block
- Goal deletion removes step statuses from existing check-ins, but there is no separate cleanup UI or undo flow

Important current model facts:
- Energy has been removed from the live data model and UI.
- Reflections no longer live in a separate top-level collection.
- Current `DailyCheckIn` stores `statuses` and optional `reflection`.

## Important file paths

### App shell

- `app/(app)/_layout.tsx`
- `app/(app)/index.tsx`
- `app/(app)/history.tsx`
- `app/(app)/goals.tsx`
- `app/(app)/profile.tsx`

### Auth

- `app/(auth)/login.tsx`
- `app/(auth)/signup.tsx`
- `app/(auth)/forgot-password.tsx`

### Providers and storage

- `src/providers/AuthProvider.tsx`
- `src/providers/HabitQuestDataProvider.tsx`
- `src/lib/supabase.ts`
- `src/lib/habitQuestStore.ts`

### Hooks

- `src/hooks/useHabitQuestToday.ts`
- `src/hooks/useHabitQuestHistory.ts`
- `src/hooks/useHabitQuestGoals.ts`

### Domain

- `src/domain/habitQuestSelectors.ts`
- `src/domain/habitQuestProgress.ts`
- `src/domain/habitQuestHistory.ts`

### Home components

- `src/components/home/HomeHero.tsx`
- `src/components/home/DailyCheckInCard.tsx`
- `src/components/home/ReflectionCard.tsx`
- `src/components/home/GoalsListCard.tsx`
- `src/components/home/GoalComposerCard.tsx`
- `src/components/home/GoalEditModal.tsx`
- `src/components/home/GentleModeBanner.tsx`
- `src/components/home/styles.ts`

### History components

- `src/components/history/HistoryHeader.tsx`
- `src/components/history/TrendSummaryCard.tsx`
- `src/components/history/CheckInHistoryCard.tsx`
- `src/components/history/ReflectionHistoryCard.tsx`
- `src/components/history/styles.ts`

### Context/spec files

- `docs/context/design-spec.md`
- `docs/context/feature-spec.md`
- `docs/context/habitquest_v2_spec.md`
- `docs/context/habitquest_v3_spec.md`

## Design rules

Keep these stable:

- Calm, supportive, low-pressure tone
- No shame-based language
- No dashboard overload
- No unnecessary metrics on Today
- One primary action per screen where possible
- Today should stay action-focused
- History should hold trends and reflections
- Goals should own planning/setup
- Profile should own account actions
- Avoid reintroducing energy/mood friction into the core check-in loop
- Avoid making the app feel childish or RPG-heavy

### Current visual direction

- Soft neutral backgrounds
- Dark green emphasis
- Rounded cards
- Minimal clutter
- Secondary actions visually weaker than primary actions

## Next priorities

1. Build a Goal Details screen
   - Open from a goal card
   - Show that goal’s steps and recent related check-ins
   - Allow lightweight editing without overloading the Goals tab

2. Tighten goal editing UX
   - Possibly replace inline Edit/Delete text actions with a cleaner overflow interaction if needed
   - Keep it subtle

3. Review local data migration behavior
   - Especially if more users already have pre-v3 local data

4. Consider whether Gentle Mode should eventually be stored per-day instead of a global boolean
   - Current spec says recommended, not mandatory
   - Current implementation still uses one `gentleModeEnabled` boolean

## Testing steps

### Run

```bash
npm install
npm run typecheck
npx expo start
```

### Manual validation checklist

1. Sign up with first name, email, password, and confirm password
2. Check that the Profile tab shows first name and email
3. Create a goal with at least one step in Goals
4. Edit the goal, rename a step, add/delete a step, and save
5. Delete a goal and confirm it disappears
6. On Today, tap task rows to cycle states
7. Tap Complete Check-in
8. Confirm the reflection modal opens
9. Save a reflection and verify it appears in History
10. Skip reflection and confirm the flow closes cleanly
11. Trigger Gentle Mode via existing missed-day logic or seed data
12. Confirm the Today header changes to “One meaningful step is enough today.”
13. Confirm History uses readable dates and no energy text
14. In dev mode, confirm seed/reset utilities only appear on Goals

## Recommended startup sequence for a fresh Codex session

Read these first:

1. `AGENTS.md`
2. `docs/context/habitquest-codex-handoff.md`
3. `docs/context/habitquest_v3_spec.md`

Then inspect:

- `src/providers/HabitQuestDataProvider.tsx`
- `src/hooks/useHabitQuestToday.ts`
- `src/hooks/useHabitQuestGoals.ts`

## Notes for the next session

- Treat this file as the current high-level handoff, not the sole source of truth
- Prefer the actual codebase over assumptions from older chat context
- Preserve the current architecture unless there is a clear reason to change it
- Prefer targeted edits over broad rewrites
