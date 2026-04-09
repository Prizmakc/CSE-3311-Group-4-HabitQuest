# HabitQuest v3 Specification
## Focus: Behavioral clarity, goal lifecycle, and Gentle Mode implementation

---

# 1. Overview

This iteration finalizes the core product behavior.

The app already has:
- a clean Today flow
- task interaction model (tap-to-cycle)
- tab-based navigation
- optional reflection

This version introduces:
- a real Gentle Mode system (behavioral, not visual)
- full goal lifecycle (edit/delete)
- removal of unnecessary concepts (energy)
- UI clarity improvements

---

# 2. Core Product Philosophy

The app is NOT:
- a tracker
- a dashboard
- a productivity optimizer

The app IS:
- a daily action tool
- focused on completing today
- reducing pressure while maintaining momentum

---

# 3. Gentle Mode (CORE FEATURE)

## 3.1 Definition

Gentle Mode reduces pressure without breaking momentum.

When enabled:
→ The success threshold for the day is lowered

---

## 3.2 Behavior Rules

### Normal Mode:
- User completes tasks normally
- Full completion is implied goal

### Gentle Mode:
- Completing ONE step (Done OR Partial) = sufficient for the day

---

## 3.3 Implementation Logic

Add helper function:

function isDaySuccessful(checkIn, gentleModeEnabled) {
  if (!gentleModeEnabled) return null

  return Object.values(checkIn.statuses).some(
    status => status === "completed" || status === "partial"
  )
}

---

## 3.4 UI Changes (Today Screen)

When Gentle Mode is ON:

Replace passive label:
" Gentle Mode is on "

With:

Primary message:
"One meaningful step is enough today."

Optional subtext:
"Keep momentum, not pressure."

---

## 3.5 What Gentle Mode DOES NOT change

- task states (Done / Partial / Skip)
- goal definitions
- stored data
- history calculations

---

## 3.6 Scope

Gentle Mode applies ONLY to:
- current day check-in experience

It does NOT:
- modify goals permanently
- affect past or future days

---

# 4. Goal Management System

## 4.1 Add Goal Actions

Each goal must support:
- Edit
- Delete

---

## 4.2 UI Pattern

Use one of:
- 3-dot menu (preferred)
OR
- small inline actions

DO NOT:
- add large buttons
- clutter the card UI

---

## 4.3 Edit Goal

Editable fields:
- title
- why
- reward
- steps list

---

## 4.4 Step Editing

Each step must support:
- rename
- delete

---

## 4.5 Delete Behavior

Delete Goal:
- removes goal and all steps
- requires confirmation

Delete Step:
- removes only that step

---

# 5. Remove Energy System

## 5.1 Remove Completely

Delete:
- energy input
- energy storage
- energy display in history
- "energy note"
- any related fallback UI text

---

## 5.2 Data Cleanup

If energy exists in stored data:
- ignore safely OR remove during migration

---

# 6. Today Screen Improvements

## 6.1 Task Interaction

Keep:
- tap-to-cycle states

States:
- default
- completed
- partial
- skipped

---

## 6.2 Status Clarity Improvements

Adjust styling:

- Completed:
  strongest visual emphasis

- Partial:
  clearly weaker than completed

- Skipped:
  muted / neutral

- Default:
  lowest emphasis

Goal:
→ instantly scannable states

---

## 6.3 Instruction Copy

Keep:
"Tap each step until it matches what happened today, then finish the check-in."

Do NOT:
- reintroduce multiple inputs or friction

---

## 6.4 Hero Section

Keep:
"Keep today light."

Reduce:
- vertical height slightly

Goal:
→ first task visible sooner

---

## 6.5 Gentle Mode Card

When OFF:
- keep current prompt

When ON:
- reduce visual weight OR collapse
- do not compete with task list

---

# 7. Reflection Modal Fixes

## 7.1 Keyboard Handling

Must:
- dismiss keyboard when tapping outside
- keep Save / Skip buttons visible
- optionally include "Done" action

---

## 7.2 Tone Adjustment

When Gentle Mode is ON:

Use:
"Anything worth noting?"

Instead of structured reflection prompts

---

# 8. History Screen Cleanup

## 8.1 Remove Noise

Remove:
- explanatory filler text
- unnecessary descriptions

---

## 8.2 Keep Only

- date
- step statuses
- optional reflection

---

## 8.3 Date Formatting

Convert:
ISO format → readable format

Example:
"2026-04-08" → "Apr 8, 2026"

---

# 9. Profile Updates

## 9.1 Add First Name

Profile displays:
- first name
- email
- sign out

---

## 9.2 Signup Flow

Add field:
- first name

---

## 9.3 User Model

User {
  id
  email
  firstName
}

---

# 10. Data Model Changes

## 10.1 DailyCheckIn

DailyCheckIn {
  date
  statuses: Record<stepId, StepStatus>
  reflection?: string
}

---

## 10.2 Remove

- energy-related fields

---

## 10.3 Gentle Mode State

Store:

gentleModeEnabled: boolean

Recommended:
- scoped per day

---

# 11. Out of Scope

DO NOT implement:

- AI habit suggestions
- automatic step prioritization
- dynamic step hiding
- streak systems
- scoring systems
- analytics dashboards

---

# 12. Success Criteria

This version is complete when:

- Gentle Mode changes behavior (not just UI)
- Goals can be edited and deleted
- Steps can be edited and deleted
- Energy is fully removed
- Today screen feels fast and focused
- No unnecessary friction in check-in

---

# 13. Summary

User opens app →
checks in quickly →
feels progress without pressure →
returns tomorrow

No extra features.
No complexity.
Just clarity.