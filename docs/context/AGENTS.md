# HabitQuest AGENTS Guide

This file is the working source of truth for how Codex should build HabitQuest unless explicitly overridden by you.

## 1. Project Intent
- Product: HabitQuest (mobile-first habit + goal execution app).
- Audience: Students and young professionals.
- Current phase: Early-stage Iteration 1 build and rapid refinement.
- Immediate implementation priority: App scaffold + authentication flow.

## 2. Differentiation Requirements (Must Preserve)
When making product or UX decisions, preserve these core differentiators:
- `Goal -> concrete steps` translation (not vague goal tracking).
- Fast `daily accountability loop` (check-in should be lightweight).
- `Gentle Mode` (burnout-friendly scope reduction and recovery).
- Visible momentum (`streak/progress`) with recovery-friendly behavior.

If a proposed change weakens these, flag it before implementing.

## 3. Iteration 1 Build Requirements
Minimum demoable slice:
- Create goal + add steps (manual step entry is fine).
- Daily check-in with done/skipped.
- Basic progress/streak visibility.
- At least one special-case behavior (e.g., missed-day recovery or empty-state prompt).
- Mobile demo readiness is the default target.

## 4. Stack and Tooling Decisions
Current chosen stack:
- Frontend: React Native + Expo + TypeScript + Expo Router.
- Auth/Backend: Supabase (email/password now).
- Auth scope now: Login, Signup, Forgot Password.
- Social login (Google/Apple): Deferred.

## 5. Architecture and Routing Rules
- Keep route groups:
- `app/(auth)` for logged-out screens.
- `app/(app)` for authenticated screens.
- Protect routes using auth session guard in layout files.
- Keep Supabase initialization in one place: `src/lib/supabase.ts`.
- Keep auth session state in provider/context: `src/providers/AuthProvider.tsx`.
- Keep shared form/input primitives under `src/components`.

## 6. API / Contract Rules
Auth contracts (current):
- Login: `supabase.auth.signInWithPassword({ email, password })`
- Signup: `supabase.auth.signUp({ email, password })`
- Forgot password: `supabase.auth.resetPasswordForEmail(email)`
- Logout: `supabase.auth.signOut()`
- Session bootstrap: `supabase.auth.getSession()`
- Session listener: `supabase.auth.onAuthStateChange(...)`

Environment contract:
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`

Rules:
- Never hardcode keys or URLs in source.
- Never commit real secrets.
- Validate required env vars at startup and fail fast with clear error.

## 7. Naming Conventions
- Components: `PascalCase` (`AuthInput.tsx`, `AuthProvider.tsx`).
- Hooks/helpers/variables/functions: `camelCase`.
- Route files: lowercase kebab when multi-word (`forgot-password.tsx`).
- Group folders: parenthesized Expo Router groups (`(auth)`, `(app)`).
- Constants/env names: `UPPER_SNAKE_CASE`.
- Prefer clear names over abbreviations.

## 8. UI/UX Constraints (Current)
- Mobile-first layouts.
- Keep auth screens clean and simple for now.
- Branding/colors can be refined later; avoid over-designing early.
- UX copy should reinforce accountability and recovery (not punishment).

## 9. Coding Rules
- Prefer TypeScript strictness.
- Keep files focused and small; avoid monolithic screens.
- Add basic loading + error states for all async auth actions.
- Use reusable UI primitives where practical.
- Avoid speculative complexity; build only what supports current iteration goals.

## 10. Collaboration Rules for Codex
- Before major changes, summarize what will be changed.
- After changes, list updated files and what each change does.
- If a decision is ambiguous, ask concise clarifying questions.
- If blocked by environment/network, report clearly and give local run steps.

## 11. Pending / Open Decisions
- Final Supabase confirmation (currently assumed and scaffolded).
- Final visual design system (colors, typography, branding).
- Exact schema and API for goals/steps/check-ins beyond auth.

## 12. Priority Order for Next Work
1. Stabilize auth flow and run locally.
2. Add post-login core loop screens (Goal list/create + Step creation).
3. Add daily check-in flow.
4. Add basic progress + one recovery special case.
5. Add Gentle Mode behavior in minimal usable form.

