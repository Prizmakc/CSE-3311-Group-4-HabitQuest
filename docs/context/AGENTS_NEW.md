# HabitQuest Agent Operating Guide

This file is the primary working-context document for new Codex/ChatGPT sessions in this repository.

## 1. Product Overview and Design Direction
- Product: HabitQuest.
- Category: gentle self-improvement / habit and goal companion.
- Audience: students and young adults who want structure without feeling punished.
- Core promise: turn vague goals into manageable daily actions, keep momentum visible, and support recovery after missed days.

### Product tone
- calm
- supportive
- direct
- low-pressure
- structured but forgiving

### Avoid drifting into
- generic habit tracker only
- rigid streak punishment app
- noisy productivity dashboard
- childish or over-gamified RPG behavior

## 2. Current App and Navigation Architecture
- Authentication uses Supabase email/password and gates access to the authenticated app shell.
- Authenticated users land in a bottom-tab app shell in `app/(app)/_layout.tsx`.
- Primary visible sections:
- `Today`
- `History`
- `Goals`
- The old single stacked home flow has been split across these three spaces.
- Visible tabs are the current navigation model.
- Swipe navigation was considered but intentionally not implemented to avoid extra dependency/complexity and because visible tabs are clearer.

### Section ownership
- `Today`: hero, progress snapshot, daily check-in, reflection, Gentle Mode prompt.
- `History`: trend summary, recent check-ins, recent reflections.
- `Goals`: saved goals, create goal flow, dev-only utilities.

## 3. Current Data and State Architecture
- Product data is local-first and stored with `AsyncStorage`.
- Shared authenticated product state now lives in:
- `src/providers/HabitQuestDataProvider.tsx`
- This provider is mounted at the authenticated shell level so tabs stay in sync.
- The provider owns:
- loading persisted data
- saving product data
- creating goals
- saving check-ins
- saving reflections
- enabling/disabling Gentle Mode
- dev-only seed/reset actions

### Current section hooks
- `src/hooks/useHabitQuestToday.ts`
- `src/hooks/useHabitQuestHistory.ts`
- `src/hooks/useHabitQuestGoals.ts`

### Removed architecture
- `src/hooks/useHabitQuestHome.ts` was removed.

### Domain helpers
- `src/domain/habitQuestSelectors.ts`: selectors and flattening helpers.
- `src/domain/habitQuestProgress.ts`: streak/progress/missed-day logic.
- `src/domain/habitQuestHistory.ts`: history/trend shaping for the History screen.

## 4. Main Implemented User Flows
- Login / signup / forgot password with Supabase auth.
- Goal creation with required validation:
- goal title required
- at least one step required
- Goals persist locally.
- Daily check-ins persist locally:
- statuses are `completed`, `partial`, `skipped`
- optional note
- optional energy state
- Reflections persist locally:
- `daily`
- `weekly`
- Progress summaries and streaks are computed locally from stored check-ins.
- Gentle Mode is suggested after missed recent days and can be exited manually.
- Goals creation/setup now lives in the Goals section instead of competing with the daily loop.
- Developer utilities are dev-only (`__DEV__`) and only appear on the Goals screen.

## 5. Practical File and Folder Structure
- `app/(auth)/`: auth screens and auth route guard.
- `app/(app)/_layout.tsx`: authenticated tab shell.
- `app/(app)/index.tsx`: Today screen.
- `app/(app)/history.tsx`: History screen.
- `app/(app)/goals.tsx`: Goals screen.
- `src/providers/AuthProvider.tsx`: Supabase auth session provider.
- `src/providers/HabitQuestDataProvider.tsx`: local-first product data provider for authenticated tabs.
- `src/lib/supabase.ts`: Supabase client.
- `src/lib/habitQuestStore.ts`: local storage load/save/reset/seed helpers.
- `src/types/habitquest.ts`: core local-first types.
- `src/components/home/`: Today/Goals shared UI pieces and styling.
- `src/components/history/`: History-specific UI pieces and styling.
- `src/hooks/`: screen-level hooks for Today, History, Goals.
- `src/domain/`: selectors, progress logic, history shaping.

## 6. Known Limitations and Technical Debt
- Product data is local-first only:
- no cross-device sync
- uninstall/cleared storage loses product state
- There are no Supabase-backed product tables yet for goals/check-ins/reflections.
- No swipe navigation between tabs.
- No notifications/reminders pipeline.
- No final design system or motion polish pass yet.
- Reward/milestone mechanics are still lightweight.

## 7. Recommended Next Implementation Steps
1. Build a Goal Details flow so each saved goal can open into its own focused screen.
2. Add lightweight goal editing and step editing from the Goals section.
3. Deepen the History section with calm per-goal progress views if needed.
4. Only after local flows are stable, decide whether to mirror the product model into Supabase tables.
5. Keep the bottom-tab shell and current section boundaries intact while expanding.

## 8. Local Validation Commands and Checks
Install dependencies:
```bash
npm install
```

Typecheck:
```bash
npm run typecheck
```

Run Expo:
```bash
npx expo start
```

WSL/iPhone tunnel fallback:
```bash
npx expo start --tunnel -c
```

Current expected validation:
- `npm run typecheck` passes.
- Authenticated users land in the `Today / History / Goals` tab shell.
- Goal creation works from the Goals tab.
- Check-ins and reflections work from the Today tab.
- History reflects current local data.

## 9. Guardrails
- Keep the calm, supportive tone.
- Do not re-collapse the app back into one long stacked home screen.
- Do not move product data to Supabase yet unless explicitly requested.
- Keep developer utilities out of normal user-facing flows.
- Preserve existing local-first behavior while restructuring or polishing.

## 10. Context Priority
Use these docs together:
- `docs/context/AGENTS_NEW.md`
- `docs/context/feature-spec.md`
- `docs/context/design-spec.md`

If there is a conflict:
1. `AGENTS_NEW.md`
2. `feature-spec.md`
3. `design-spec.md`
