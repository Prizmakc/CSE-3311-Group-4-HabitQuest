# HabitQuest v2 UX & Interaction Spec

## Purpose
Refactor the core user experience to reduce friction, minimize cognitive load, and align with the app’s goal:
→ fast, low-pressure daily check-ins

Key principle:
- Users should complete a check-in in ≤ 2 taps

---

## Core UX Rules (Global)

- Minimize taps (target: ≤ 2 actions for check-in)
- No required typing in core flow
- Reflection is always optional
- Avoid negative metrics (no % completion or streak pressure on home screen)
- One primary action per screen
- Keep UI minimal and focused

---

## Navigation Changes

### Bottom Tab Bar (Updated)
Tabs:
- Today
- History
- Goals
- Profile (NEW)

### Remove:
- Sign out button from Today screen

---

## Feature: Profile Tab (NEW)

### Purpose:
Move account-related actions out of main flow

### UI:
- Display user email
- Button: "Sign Out"

### Future (optional):
- Settings
- Notifications

---

## Feature: Today Screen (Major Refactor)

### Problem:
- Too many sections (hero, progress, check-in, reflection, gentle mode)
- High cognitive load
- Too many required interactions

### Goal:
Make Today screen focused ONLY on completing a check-in

---

## New Today Screen Layout

1. Header (keep existing style)
2. Task List (check-in)
3. Primary CTA: "Complete Check-in"

---

## REMOVE from Today Screen:

- Completion percentage ("0% today")
- Streak display (from main view)
- Inline reflection input
- Energy selector (temporarily remove)
- Separate "Save check-in note" button

---

## Task Interaction Redesign

### Current:
- 3 buttons per task (Done / Partial / Skip)

### New:

Each task is a single interactive row.

### Behavior:
- Tap cycles through states:
  - Default → Done → Partial → Skip → Default

### Visual Feedback:
- Done → strong highlight (primary color)
- Partial → lighter highlight
- Skip → muted/low emphasis
- Default → neutral

---

## Check-in Flow (Updated)

### Step 1:
User taps task(s) to set status

### Step 2:
User taps "Complete Check-in"

---

## Post Check-in Behavior

After user taps "Complete Check-in":

### Show Modal (Optional Reflection)

Title:
"Quick reflection (optional)"

Prompt:
- What worked?
- What felt hard?
- What’s one small next step?

### Options:
- "Skip"
- "Save reflection"

---

## Gentle Mode (Updated Behavior)

### Current Problem:
- Appears reactively after failure

### New Behavior:

Trigger earlier and more proactively.

### Option 1:
Show banner BEFORE check-in:
"Want a lighter day?"

### Option 2:
Auto-suggest after missed days (keep existing logic)

---

## Feature: History Screen (Refocus)

### Purpose:
All tracking, trends, and reflection live here

### Keep:
- Trend summary
- Completed / partial counts
- Check-in history
- Reflections

### Move ALL metrics here:
- Streak
- Weekly stats
- Completion patterns

---

## Feature: Goals Screen (No major change)

### Keep:
- Goal creation flow
- Steps list

### Minor improvement:
- Emphasize simplicity (1 goal → few steps)

---

## UI Hierarchy Rules

- One primary CTA per screen
- Secondary actions should be visually weaker
- Avoid equal-weight buttons (e.g., Done / Partial / Skip currently)

---

## Interaction Principles

- Prefer taps over multiple buttons
- Reduce visible choices
- Use progressive disclosure (hide complexity until needed)

---

## Developer Notes

- Update task component to support "cycle state on tap"
- Store state as enum:
  - "completed" | "partial" | "skipped" | null

- Refactor Today screen layout:
  - Remove unused components
  - Add single CTA button

- Implement modal component for reflection
- Add Profile tab to navigation

---

## Success Criteria

- User can complete check-in in ≤ 5 seconds
- No typing required for basic usage
- Reduced visual clutter on Today screen
- Clear separation:
  - Today = action
  - History = insight
  - Profile = account
