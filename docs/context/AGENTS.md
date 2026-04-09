# HabitQuest Agent Operating Guide

This is the primary source of truth for new Codex or ChatGPT sessions working in this repository.

## 1. Product intent
- HabitQuest is a mobile-first, local-first self-improvement app.
- Audience: students and young adults who want structure without feeling punished.
- The product should feel like a daily action tool, not a dashboard or productivity optimizer.
- Core promise: turn vague goals into manageable daily actions, reduce pressure, and help users maintain momentum.

## 2. Product tone and design direction
- calm
- supportive
- direct
- low-pressure
- structured but forgiving

Avoid drifting into:
- generic habit tracker only
- rigid streak-punishment app
- noisy productivity dashboard
- childish or over-gamified quest/RPG behavior

Current visual direction:
- soft neutral backgrounds
- dark green emphasis
- rounded cards
- minimal clutter
- secondary actions visually weaker than primary actions

## 3. Current navigation architecture
- Expo Router is used.
- Authenticated users land in a bottom-tab shell in `app/(app)/_layout.tsx`.
- Tabs:
- `Today`
- `History`
- `Goals`
- `Profile`

Visible tabs are the active navigation model.
Swipe navigation was considered earlier but is not implemented and is not the current navigation pattern.

## 4. Current section ownership
- `Today`
- hero
- gentle mode prompt when applicable
- task list for check-in
- single primary CTA: `Complete Check-in`
- optional reflection modal after check-in

- `History`
- trend summary
- recent check-ins
- recent reflections

- `Goals`
- saved goals
- create goal flow
- edit/delete goal flow
- step rename/delete inside goal edit modal
- dev-only local utilities under `__DEV__`

- `Profile`
- first name
- email
- sign out

Do not collapse the app back into one long stacked home screen.

## 5. Current data and state architecture
- Product data is local-first with `AsyncStorage`.
- Shared authenticated product state is provided by:
- `src/providers/HabitQuestDataProvider.tsx`

The provider currently owns:
- loading persisted data
- saving product data
- creating goals
- updating goals
- deleting goals
- saving check-ins
- saving reflections
- enabling/disabling Gentle Mode
- dev-only seed/reset actions

Section hooks:
- `src/hooks/useHabitQuestToday.ts`
- `src/hooks/useHabitQuestHistory.ts`
- `src/hooks/useHabitQuestGoals.ts`

Removed architecture:
- `src/hooks/useHabitQuestHome.ts` was removed and should stay removed.

Domain files:
- `src/domain/habitQuestSelectors.ts`
- `src/domain/habitQuestProgress.ts`
- `src/domain/habitQuestHistory.ts`

## 6. Current product data model
Key current types live in:
- `src/types/habitquest.ts`

Important current model decisions:
- `Goal` contains a list of `GoalStep`s.
- `DailyCheckIn` stores:
- `date`
- `statuses: Record<stepId, StepStatus>`
- `reflection?: string`
- `StepStatus` is:
- `completed`
- `partial`
- `skipped`

Important removals:
- the energy system has been removed from the UI and product data model
- reflections are no longer stored as a separate top-level collection

Legacy migration behavior:
- old local data with `note` or `energy` fields is migrated/ignored safely in `src/lib/habitQuestStore.ts`
- legacy standalone reflections are merged into `checkIn.reflection` by date key

## 7. Main implemented user flows

### Authentication
- Login with email/password
- Signup with:
- first name
- email
- password
- confirm password
- Forgot password flow
- Profile reads first name from Supabase user metadata

### Today
- task rows are tap-to-cycle:
- default -> completed -> partial -> skipped -> default
- one primary CTA: `Complete Check-in`
- optional reflection appears in a modal after check-in
- no required typing in the core flow
- no energy selector
- no inline note field
- no sign-out button on Today

### Gentle Mode
- stored as `gentleModeEnabled: boolean`
- currently global, not per-day
- changes current-day success meaning via `isDaySuccessful(...)` in `src/domain/habitQuestProgress.ts`
- does not modify goals permanently
- does not rewrite historical data

### Goals
- create goal with validation
- goal title required
- at least one step required
- edit goal
- delete goal with confirmation
- rename step
- delete step
- add step while editing

### History
- readable dates
- recent check-ins
- recent reflections
- simple trend summary
- no energy display

### Developer utilities
- seed local demo data
- reset local data
- only shown in Goals under `__DEV__`

## 8. Important file paths

### App shell and screens
- `app/(app)/_layout.tsx`
- `app/(app)/index.tsx`
- `app/(app)/history.tsx`
- `app/(app)/goals.tsx`
- `app/(app)/profile.tsx`

### Auth screens
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

### Home / Goals components
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
- `docs/context/habitquest-codex-handoff.md`

## 9. Known limitations and technical debt
- No Goal Details screen yet
- No per-goal history view
- No goal/step drag-reorder
- No settings/notifications in Profile
- No Supabase-backed product tables for product data yet
- No cross-device sync
- No motion/animation polish pass yet

Behavioral caveats:
- legacy reflections may be merged by day during migration
- deleting a goal removes related step statuses from saved check-ins
- there is no undo flow for goal deletion

## 10. Guardrails
- Keep the current calm, supportive tone.
- Do not reintroduce pressure-heavy metrics into Today.
- Do not reintroduce energy/mood friction into the core check-in flow.
- Keep Today action-focused, History insight-focused, Goals planning-focused.
- Keep developer utilities out of normal user-facing flows.
- Do not move product data to Supabase yet unless explicitly requested.
- Prefer targeted edits over broad rewrites.

## 11. Recommended next priorities
1. Build a Goal Details flow.
2. Add per-goal recent check-ins/history.
3. Tighten goal card actions if inline Edit/Delete feels too exposed.
4. Review local-data migration behavior with pre-v3 users.
5. Consider whether Gentle Mode should eventually be per-day instead of a global boolean.

## 12. Local validation workflow
Run:

```bash
npm install
npm run typecheck
npx expo start
```

Manual checks:
- signup with first name works
- Profile shows first name and email
- goal create/edit/delete works
- step rename/delete works
- Today task rows cycle correctly
- `Complete Check-in` opens reflection modal
- saving/skipping reflection works cleanly
- History shows readable dates and no energy text
- dev utilities only appear in Goals under `__DEV__`

At the time of this handoff:
- `npm run typecheck` passes
