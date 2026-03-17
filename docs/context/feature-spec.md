# HabitQuest Feature Spec

This document defines the intended product scope and feature direction for HabitQuest.

It should be used alongside `AGENTS.md` and `design-spec.md`.

---

## 1. Product Scope Direction

HabitQuest is a gentle self-improvement app focused on helping students and young adults:
- define meaningful goals,
- break them into manageable steps,
- check in quickly,
- reflect regularly,
- recover after missed days without shame.

---

## 2. MVP Build Order

Build in this order unless the user explicitly overrides:
1. Persistent goals and goal steps
2. Daily check-in persistence
3. Reflection persistence
4. Progress summary / streak logic
5. Gentle Mode real trigger logic
6. Reward / milestone card system
7. Design polish and animations
8. Notifications / reminders

---

## 3. Core Features

### 3.1 Goal Creation
Users should be able to create a meaningful goal and add one or more small steps.

#### Requirements
- goal title required,
- at least one step required,
- validation messages should be clear,
- setup should feel fast and simple,
- users should not need to enter too much metadata.

### 3.2 Goal Breakdown
Goals should support a step-based structure rather than existing only as flat habits.

#### Direction
- steps should be manageable,
- steps should be user-editable,
- a goal may have multiple steps,
- steps should support future check-in association.

### 3.3 Daily Check-In
Users should be able to log a daily status quickly.

#### Direction
Preferred statuses:
- completed,
- partially completed,
- skipped.

Optional additions:
- mood/energy,
- short note.

### 3.4 Reflection
Users should be able to write short reflections tied to a time period or check-in context.

#### Direction
Reflections should be lightweight and prompt-based.

### 3.5 Progress Summary
Users should see simple progress visibility.

#### Direction
Keep this lightweight.
Do not overbuild analytics.

### 3.6 Gentle Mode
Gentle Mode should be a recovery feature triggered after repeated missed days or rough periods.

#### Direction
- soften language,
- reduce pressure,
- suggest smaller steps,
- encourage re-entry.

### 3.7 Rewards / Milestones
Users may associate milestones with simple real-life rewards.

#### Direction
Keep this lightweight and motivational.
Do not implement a complex in-app economy.

---

## 4. Deferred Features

Explicitly defer these unless requested later:
- social feed,
- friends / competition,
- chat,
- advanced AI coaching,
- complex analytics dashboards,
- heavy gamification systems,
- complex notification pipelines.
