# HabitQuest

Mobile-first habit and goal execution app.

## Stack
- **Expo (React Native)** — build/run the mobile app (iOS/Android)
- **TypeScript** — safer, typed JavaScript
- **Expo Router** — file-based navigation (screens live in `app/`)
- **Supabase Auth** — email/password authentication backend

## Project Structure
- **Auth screens**: `app/(auth)/login.tsx`, `signup.tsx`, `forgot-password.tsx`
- **Protected app area**: `app/(app)/index.tsx` (placeholder home after login)
- **Session provider**: `src/providers/AuthProvider.tsx`
- **Supabase client**: `src/lib/supabase.ts`

## Prerequisites
- Node.js (recommended: v20+) and npm
- Expo Go (testing on phone)
- A Supabase project (for auth)

**Install dependencies**:
```bash
npm install
```

## Run
Start the dev server:
```bash
npx expo start
```

### iPhone / WSL users (recommended)
If you're running Expo from WSL or the QR code won’t open, use a tunnel:
```bash
npx expo start --tunnel -c
```
Then scan the QR **inside Expo Go**.

### Shortcuts (when prompted)
- `a` — Android emulator/device
- `i` — iOS simulator (Mac only)
- `w` — web

## Verify it works
1) Open the app → **Sign up**
2) In Supabase dashboard → **Authentication → Users**, confirm the user appears
3) Log out / log in again

## Common Issues
- **“Missing Supabase env vars …”**: you don’t have a `.env` file or the variable names don’t match `.env.example`.
- **“Missing Supabase config …”**: set keys in `.env` or `src/config/supabaseConfig.ts`.
- **Expo Go says SDK mismatch**: run `npm install` and make sure you're on the latest project branch; Expo Go only supports certain SDKs.
