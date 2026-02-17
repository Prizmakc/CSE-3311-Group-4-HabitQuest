# HabitQuest

Mobile-first habit and goal execution app.

## Stack
- Expo (React Native)
- TypeScript
- Expo Router
- Supabase Auth (email/password)

## Current Scaffold
- Auth flow:
- `app/(auth)/login.tsx`
- `app/(auth)/signup.tsx`
- `app/(auth)/forgot-password.tsx`
- Protected app area:
- `app/(app)/index.tsx`
- Session provider:
- `src/providers/AuthProvider.tsx`
- Supabase client:
- `src/lib/supabase.ts`

## Setup
1. Copy `.env.example` to `.env`.
2. Install dependencies:
```bash
npm install
```
3. Run the app:
```bash
npm run start
```

Then press:
- `i` for iOS simulator
- `a` for Android emulator
- `w` for web preview

## Notes
- Login/signup/forgot-password are fully wired to Supabase auth calls.
- Route protection is enabled: unauthenticated users are redirected to login.
- `app/(app)/index.tsx` is a placeholder home screen after login.
