# HabitQuest Design Spec

This document defines the intended product identity, UX tone, visual direction, and interaction patterns for HabitQuest.

Codex should treat this as the source of truth for **how the app should feel and behave from a user-experience standpoint**.

---

## 1. Product Identity

HabitQuest is **not** meant to be just another generic habit tracker.

It should be built as:

> **A gentle self-improvement app for students and young adults who want structure without feeling punished when they fall behind.**

The app should help users:
- turn vague goals into manageable daily actions,
- keep momentum through fast check-ins,
- recover after missed days without shame,
- feel encouraged by progress rather than judged by failure.

### Core promise
> HabitQuest helps overwhelmed users build momentum through small daily wins and recover gracefully when life gets messy.

### Product category positioning
HabitQuest should be designed as a blend of:
- habit tracker,
- goal progress app,
- gentle accountability companion.

If a future feature makes the product feel overly rigid, overly competitive, noisy, or shame-based, that feature should be questioned before implementation.

---

## 2. Primary User

The primary target user is:

> **college students and young adults who want self-improvement structure but get overwhelmed by strict productivity apps**

### Typical user traits
- wants to improve routines, health, studying, or consistency,
- likes the idea of goals but struggles with follow-through,
- may feel discouraged by missed streaks,
- wants something fast and lightweight,
- does not want to manage a complicated productivity system.

### Design implication
The app should feel:
- supportive,
- low-pressure,
- clean,
- motivating,
- emotionally safe.

It should **not** feel:
- corporate,
- intense,
- hyper-optimized,
- childish,
- guilt-driven,
- overloaded with metrics.

---

## 3. Emotional Tone

HabitQuest should create this emotional impression:
- calm,
- encouraging,
- clean,
- slightly rewarding,
- structured but forgiving.

### Tone rules
Use copy that is:
- warm,
- direct,
- short,
- reassuring,
- practical.

Avoid copy that is:
- shame-based,
- overly hype-driven,
- sarcastic,
- too clinical,
- excessively playful or cartoonish.

### Messaging examples
Good direction:
- “Small progress still counts.”
- “Rough week? Let’s make today lighter.”
- “Pick one small win for today.”
- “You’re not starting over. You’re picking back up.”

Bad direction:
- “You failed your streak.”
- “You’re behind.”
- “You lost progress.”
- “Grind harder.”
- “Level up!!!”

---

## 4. Core UX Principles

### 4.1 Fast daily loop
The daily interaction loop should be extremely lightweight.

Users should be able to:
- open the app,
- see what matters today,
- check in quickly,
- leave without friction.

### 4.2 Gentle recovery over punishment
The app should treat missed days as recovery opportunities, not failures.

When a user falls off, the app should:
- lower pressure,
- shrink the next step if appropriate,
- encourage re-entry,
- preserve dignity.

### 4.3 Goal clarity over habit clutter
The app should prioritize meaningful goals and their steps, not endless disconnected habit rows.

### 4.4 Visible progress without obsession
Progress should be visible, but not so dominant that the app becomes a streak-anxiety machine.

### 4.5 Simplicity over feature bloat
Every screen should feel focused.
Do not build dense dashboards with too many widgets, charts, or competing calls to action.

---

## 5. Product Structure Direction

HabitQuest should lean more toward **gentle self-improvement with structure** than a traditional checkbox habit tracker.

### Product framing
Best framing:
- “self-improvement companion with gentle accountability”

Supported by:
- goal-based planning,
- small steps,
- daily check-ins,
- reflection,
- recovery flows.

Avoid letting the product drift into:
- generic habit-only app,
- hardcore productivity manager,
- social competitive app,
- complex gamified RPG.

---

## 6. MVP Feature Direction

The MVP should feel complete while staying narrow.

### Core MVP features
1. Authentication
2. Goal creation
3. Goal breakdown into small steps
4. Daily check-in
5. Simple progress view
6. Weekly reflection
7. Gentle Mode after missed days
8. Lightweight rewards / milestone cards

### Why these matter
This set supports the product identity without creating unnecessary complexity.

### Explicitly avoid in MVP
Do not prioritize these right now:
- social feed,
- friends/leaderboards,
- chat,
- advanced analytics,
- too many graphs,
- full AI coach layer,
- complex notification engine,
- elaborate XP/shop/level system.

---

## 7. Screen Direction

The app should eventually include these main screens or equivalent sections:

### Auth
- Login
- Signup
- Forgot Password

### App
- Home / Dashboard
- Goal Creation
- Goal Details
- Daily Check-In
- Reflection
- Settings (optional / later)

### Home / Dashboard priorities
The home screen should answer:
- What matters today?
- What should I do next?
- How am I doing overall?

It should not feel like a dense admin dashboard.

The home screen should likely show:
- active goal(s),
- today’s step(s),
- quick check-in entry point,
- progress summary,
- Gentle Mode banner if relevant,
- optional milestone/reward card.

---

## 8. Goal System Design Direction

HabitQuest should be more than a flat habit checklist.

### Preferred model
A user creates:
- a meaningful goal,
- one or more small steps under that goal,
- optional cadence or frequency.

Example:
- Goal: Get healthier
- Steps:
  - Walk 20 minutes
  - Drink more water
  - Sleep before 12

### UX implications
- goals should feel intentional,
- steps should feel manageable,
- users should not need to over-plan,
- setup should stay short and not feel like project management software.

---

## 9. Daily Check-In Direction

The daily check-in should be one of the easiest interactions in the app.

### Good check-in elements
- completed,
- partially completed,
- skipped,
- optional mood/energy indicator,
- optional short note.

### Why this works
It captures real life better than a strict yes/no system and reduces pressure on imperfect days.

### UX rule
A user should never feel like daily check-in is homework.

---

## 10. Gentle Mode Direction

Gentle Mode is one of the product’s strongest differentiators and should be treated as a core experience, not a novelty.

### Purpose
Help users recover after they lose momentum.

### Good Gentle Mode behavior
When the app detects a rough patch or repeated missed days, it should:
- soften the tone,
- reduce pressure language,
- suggest smaller next steps,
- invite restart without shame,
- reframe progress as resuming rather than failing.

### Example behavior direction
Instead of:
- showing a harsh missed streak warning,

The app should do something like:
- “Rough week? Let’s make today lighter.”
- “Want to scale this down for now?”
- “A smaller win still counts.”

### Design rule
Gentle Mode should feel thoughtful and helpful, not cheesy.

---

## 11. Reflection System Direction

Reflection makes the app feel more meaningful and less mechanical.

### Goal of reflection
Help users notice patterns and adjust without self-judgment.

### Good reflection prompts
- What went well this week?
- What got in the way?
- What should feel easier next week?
- Which goal matters most right now?

### Design rule
Reflections should be short and approachable.
Do not make users fill out long journal forms by default.

---

## 12. Rewards / Goal Cards Direction

Rewards can help motivation and presentation value, but should remain lightweight.

### Good direction
Let users connect milestones to simple real-life rewards, such as:
- buy coffee,
- take a guilt-free break,
- watch a movie,
- small treat purchase.

### Bad direction
Avoid turning rewards into a complicated fake economy.

Do not build:
- coin systems,
- shops,
- heavy RPG mechanics,
- complex inventory systems.

### Design goal
Rewards should feel like encouraging self-recognition, not arcade progression.

---

## 13. Visual Direction

### Visual keywords
- soft,
- modern,
- clean,
- warm,
- calm,
- motivating.

### Recommended visual style
The app should feel like:
> **modern wellness + light productivity**

### It should not feel like
- hyper-corporate project software,
- childish cartoon quest game,
- aggressive productivity grind app,
- neon dopamine casino UI,
- dark hacker aesthetic.

### UI component direction
- rounded cards,
- clear spacing,
- simple hierarchy,
- calm surfaces,
- clear but soft affordances,
- minimal clutter.

---

## 14. Layout and Information Density

### Rules
- prefer clean vertical flow,
- avoid crowded dashboards,
- keep only the most important information above the fold,
- separate concerns using cards/sections,
- do not overwhelm users with too many options at once.

### Mobile-first expectation
This should be optimized for a mobile app first.
Interactions should feel comfortable on small screens.

---

## 15. Color and Mood Direction

The palette should support calm encouragement.

### Color direction
Favor:
- muted but warm tones,
- soft contrast,
- friendly neutrals,
- subtle accent colors.

Avoid:
- harsh alarm-heavy visuals,
- excessive bright reds for failure states,
- oversaturated gamer-style color explosions.

### Important note
Missed progress states should still be visually clear, but they should not emotionally punish the user.

---

## 16. Typography and Copy Density

### Typography direction
- readable,
- modern,
- clean,
- not overly decorative.

### Copy rules
- keep text concise,
- reduce clutter,
- use friendly headings,
- avoid long explanatory blocks on core screens.

The user should understand the next action immediately.

---

## 17. Interaction Rules

### Feedback
Interactions should provide clear feedback, but remain subtle.

### Empty states
Empty states should:
- encourage action,
- feel hopeful,
- not look barren or broken.

### Error states
Errors should:
- explain what went wrong,
- show how to fix it,
- avoid harsh blame language.

### Progress states
Progress indicators should motivate without making users obsess over perfection.

---

## 18. Anti-Patterns to Avoid

Do not let the product become:
- a generic habit app with no personality,
- a cluttered productivity dashboard,
- a rigid streak punishment system,
- an overly gamified quest game,
- a social comparison platform,
- an analytics-heavy admin tool.

If a feature pushes the app in one of those directions, reconsider it before building.

---

## 19. Codex Implementation Guidance

When making UI or UX decisions, Codex should prioritize:
1. clarity,
2. emotional safety,
3. low-friction daily use,
4. meaningful progress visibility,
5. consistency with the calm + encouraging product identity.

When there is ambiguity, prefer:
- simpler UX,
- fewer inputs,
- cleaner screens,
- supportive wording,
- lighter pressure.

---

## 20. Summary

HabitQuest should be built as:
- calm,
- encouraging,
- structured,
- forgiving,
- mobile-first,
- goal-oriented,
- recovery-friendly.

The app should help users build momentum, not guilt.
