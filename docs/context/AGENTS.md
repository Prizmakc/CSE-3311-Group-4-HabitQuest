# HabitQuest Agent Operating Guide

This file is the primary handoff and operating contract for any new Codex/agent session on this repository.

## 1. Mission and Product Direction
- Product name: HabitQuest.
- Product type: Mobile-first habit + goal execution app with light gamification.
- Audience: Students and young professionals.
- Core product promise: Convert vague goals into concrete daily actions, keep users accountable, and help users recover when momentum drops.

### Non-negotiable differentiation pillars
- Goal -> concrete steps translation.
- Fast daily accountability loop.
- Gentle Mode for burnout/recovery.
- Visible progress (streaks/completion) with non-punitive messaging.

If future changes weaken these pillars, flag before implementing.

## 2. Current Iteration Status (as of Feb 18, 2026)
Implemented:
- Expo React Native app scaffold.
- TypeScript project setup.
- Expo Router with auth route separation.
- Supabase auth integration (email/password).
- Auth pages: Login, Signup, Forgot Password.
- Signup now includes Confirm Password.
- Post-login scaffold page with demo-focused sections:
- Goal card preview/reward concept.
- Goal creation + step breakdown.
- Validation special case: block save with missing required fields.
- Daily check-in toggle.
- Reflection text area.
- Gentle Mode trigger simulation for missed days.

Not implemented yet (real backend/domain logic):
- Persistent goal/step/check-in/reflection data model.
- Real streak engine.
- Real Gentle Mode trigger based on stored misses.
- Notifications/reminders.
- Final visual design system.

## 3. Repository Structure and Key Files
- `app/_layout.tsx`: Root layout and provider mount.
- `app/index.tsx`: Entry redirect.
- `app/(auth)/_layout.tsx`: Redirect authenticated users away from auth pages.
- `app/(auth)/login.tsx`: Login UI + `signInWithPassword`.
- `app/(auth)/signup.tsx`: Signup UI + confirm password + `signUp`.
- `app/(auth)/forgot-password.tsx`: Password reset UI + `resetPasswordForEmail`.
- `app/(app)/_layout.tsx`: Route protection for authenticated area.
- `app/(app)/index.tsx`: Current post-login product scaffold for screenshots.
- `src/lib/supabase.ts`: Supabase client creation.
- `src/config/supabaseConfig.ts`: Repo-level Supabase config fallback.
- `src/providers/AuthProvider.tsx`: Session bootstrap + auth state listener.
- `src/components/AuthInput.tsx`: Shared auth input UI primitive.
- `docs/context/spec.txt`: Extracted project context/spec.
- `docs/context/HabitQuest_Project_Context_for_Codex.pdf`: Original context document.

## 4. Stack Decisions
- Frontend: React Native (Expo).
- Language: TypeScript.
- Navigation: Expo Router.
- Auth/backend: Supabase (email/password only for now).
- Social auth (Google/Apple): Explicitly deferred.

## 5. Auth Contracts
Use these Supabase contracts:
- Login: `supabase.auth.signInWithPassword({ email, password })`
- Signup: `supabase.auth.signUp({ email, password })`
- Forgot password: `supabase.auth.resetPasswordForEmail(email)`
- Logout: `supabase.auth.signOut()`
- Session bootstrap: `supabase.auth.getSession()`
- Session listener: `supabase.auth.onAuthStateChange(...)`

### Email confirmation behavior
- Team temporarily has email confirmation disabled in Supabase for easier shared testing.
- Signup success copy should assume immediate usability unless settings change.

## 6. Supabase Configuration Policy (Current Team Decision)
- Team requested ability for anyone to clone and run quickly.
- Current implementation supports both:
- `.env` values (`EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`) and
- fallback from `src/config/supabaseConfig.ts`.
- Resolution order in `src/lib/supabase.ts`: env vars first, fallback file second.

Important:
- Supabase `anon` key is public by design, but still rotate if leaked/misused.
- Never commit service-role keys.

## 7. UX and Demo Requirements for Iteration 1
Target demo behavior:
- Create a goal and add one or more steps.
- Show progress/streak indicator.
- Show daily check-in affordance.
- Show reflection affordance.
- Include at least one special-case behavior.

Special cases currently requested for screenshots:
1. Required field handling for goal creation
- User tries to save goal with missing title and/or no steps.
- App blocks save and explains missing fields.

2. Gentle Mode trigger (burnout protection)
- User misses multiple days in a row.
- App suggests enabling Gentle Mode.
- Gentle Mode reduces required steps temporarily.

## 8. Implementation Conventions
### Naming
- Components/types: PascalCase.
- Variables/functions/hooks: camelCase.
- Route files: lowercase/kebab-case where needed (e.g., `forgot-password.tsx`).
- Route groups: `(auth)`, `(app)`.

### File organization
- Keep auth logic concentrated in provider + lib.
- Keep reusable UI in `src/components`.
- Keep screen logic inside route files until complexity justifies extraction.

### Code quality
- Keep TypeScript strict compatibility.
- Include loading and error states for async auth actions.
- Avoid unnecessary abstractions in Iteration 1.
- Build for screenshot/demo clarity first, then optimize.

## 9. What the Next Agent Should Do First
1. Run `npm run typecheck` and ensure no regressions.
2. Run the app and verify auth flow with current Supabase project.
3. Verify screenshot scenarios on iOS simulator/device:
- Goal save blocked with missing fields.
- Gentle Mode suggestion after simulated missed days.
4. Start extracting scaffold state into persistent domain models (goals/steps/check-ins/reflections).

## 10. Known Gaps / Risks
- Current post-login page is demo scaffold state, not persistent data.
- No backend tables wired yet for goals/steps/check-ins.
- No notification/reminder pipeline.
- No final design system.
- Goal card reward mechanics are conceptual and may evolve.

## 11. Collaboration Notes from Current User
- User is early-stage and prioritizes tangible progress/screenshots for presentation.
- User explicitly asked for scaffold-first implementation.
- User requested richer AGENTS documentation so fresh sessions can continue without chat history.
- If uncertain, prioritize producing demoable UI states that map to rubric and special cases.

## 12. Commands and Basic Workflow
Install:
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

## 13. Guardrails for Future Changes
- Do not remove the special-case states until presentation needs are met.
- Do not replace Supabase auth stack without explicit approval.
- Keep route protection intact (`(auth)` vs `(app)` layouts).
- If email confirmation is re-enabled in Supabase, update signup UX copy and flow expectations.
- When adding persistence, keep UI behavior identical to current scaffold where possible to preserve screenshot continuity.
