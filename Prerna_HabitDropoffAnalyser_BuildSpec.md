# Habit Drop-off Analyser
## Build Specification & Product Requirements Document

**Version:** 1.0
**Date:** April 2026
**Author:** Prerna Singh, Product Manager

---

## Executive Summary

The **Habit Drop-off Analyser** is an AI-powered diagnostic tool for B2C fintech and payments PMs. It solves a critical problem: users complete their first transaction but don't build recurring payment habits. Without understanding where the habit loop breaks, PMs waste time on low-impact optimizations.

This tool takes 30 seconds of input (a 3-stage habit journey + drop-off metrics) and outputs: which stage is the bottleneck, why it's failing, and 3 specific experiments to fix it. Target users: mid-level PMs at PhonePe, Paytm, Google Pay, Swiggy, and similar platforms.

**Launch Timeline:** v1 in 2 weeks (single habit loop, 3-stage analysis). v2 in month 2 (multiple habits, benchmarks, exports).

---

## 1. Problem Statement

**Core Problem:** Users complete their first payment transaction but rarely build a recurring habit. Activation metrics look strong (D1 = 40%+), but D7 retention collapses to 15-25%. PMs know there's a leak, but not where or why.

**Who Experiences It:** Growth and product PMs at fintech/payments platforms (PhonePe, Google Pay, Paytm, etc.) and food delivery apps (Swiggy, Zomato). Also relevant for health, EdTech, and shopping platforms.

**Cost of Not Solving:** Without a diagnostic tool, PMs resort to guesswork: optimizing the wrong stage, running experiments on low-impact fixes, or worse, shipping features no one will use. Result: 2-3 wasted weeks per quarter, low engagement features, competitive disadvantage.

---

## 2. Product Vision

**One-Line Summary:** Diagnose why users abandon a habit loop, then prescribe 3 specific, testable experiments to fix it.

**Vision:** Every fintech PM can understand in 60 seconds which stage of their Trigger→Routine→Reward loop is breaking, why, and what to test next—without needing data analysts, research, or guesswork.

---

## 3. Target Users & Use Cases

### Primary User
**Mid-level Growth/Product PM at fintech/payments** (owns D7/D30 retention for a specific habit, e.g. "Send Money", "Bill Pay", "Recharge")

*Example:* "I'm the PM for PhonePe's UPI Send habit. We have 1.2M activations per week, but only 18% come back by D7. I need to know if it's a notification problem, a friction problem, or users just don't value it yet."

### Secondary User
Growth leads at food delivery, shopping, health, and EdTech apps analyzing habits like reorders, refills, and returns.

---

## 4. Core User Stories

- As a **fintech PM**, I want to **input my habit loop's drop-off % at each stage** so that I can **understand my customer journey without running a separate analysis.**

- As a PM, I want the tool to **identify which stage is the bottleneck** so that I **don't waste time optimizing low-impact fixes.**

- As a PM, I want **2–3 specific, testable experiments** so that I **can act immediately without additional research.**

- As a PM, I want to see **three confidence scores** (diagnosis, impact, experiment quality) so that I **know whether to trust the tool's output.**

---

## 5. Input Specification

### Form Fields (Required unless marked optional):

| Field Name | Type & Constraints | Example |
|---|---|---|
| Habit Name | Text, max 50 chars, required | "Send money via UPI" |
| Stage 1 Name | Text, required | "See notification" |
| Stage 1 Drop-off % | Number 0-100, required | 15 |
| Stage 2 Name | Text, required | "Open app, enter ID" |
| Stage 2 Drop-off % | Number 0-100, required | 38 |
| Stage 3 Name | Text, required | "Complete payment" |
| Stage 3 Drop-off % | Number 0-100, required | 12 |
| App Category | Dropdown, required | Fintech/Payments |
| D1 Retention % | Number, optional | 40 |
| D7 Retention % | Number, optional | 18 |
| D30 Retention % | Number, optional | 8 |
| Context | Textarea, max 300 chars, optional | "Speed is slow on stage 2" |

**Categories available:** Fintech/Payments, Food Delivery, Shopping & D2C, Health & Fitness, Learning & EdTech, Other

---

## 6. Output Specification

### 6.1 Diagnosis Card

- **Broken Stage:** Which of the 3 stages has the highest drop-off rate. Secondary signal: highest absolute user loss. Identify the stage by name.

- **Why It's Broken:** 1-2 sentence explanation from the AI, referencing the drop-off % and user context. Example: "Stage 2 (Routine) has a 38% drop-off, suggesting users find entering their UPI ID tedious or unclear. This aligns with your comment about slow speed."

- **Severity Badge:** Color-coded badge (Critical/High/Medium/Low) based on drop-off % and estimated D7 impact.

### 6.2 Three Confidence Scores

1. **Diagnosis Confidence (70-100%):** "We're 85% confident Stage 2 (Routine) is the bottleneck." Based on drop-off pattern clarity.

2. **Fix Impact Confidence (60-95%):** "Fixing this stage could improve D7 by 5-12%." Based on category benchmarks and pattern similarity.

3. **Experiment Quality Confidence (75-100%):** "These experiments are straightforward to run." Based on implementation complexity.

### 6.3 Experiments Section (3 Structured Experiments)

For each experiment, output:

- Experiment title (e.g., "Simplify UPI ID Entry")
- Hypothesis: IF [change] THEN [outcome] BECAUSE [reason]
- Implementation: 1-2 sentences on what to change
- Primary metric to track (e.g., Stage 2 completion rate)
- Expected D7 impact if hypothesis is correct (e.g., +3-6%)
- Complexity to run: Low / Medium / High

---

## 7. Sample Scenarios

### Scenario 1: PhonePe UPI Send Habit

**Input:**
- Habit: "Send money via UPI"
- Trigger: "See 'Send Money' notification" → 15% drop-off
- Routine: "Open app, enter UPI ID, authenticate" → 38% drop-off
- Reward: "Money sent, recipient notified" → 12% drop-off
- D7: 18%

**Expected Output:** Routine is the bottleneck.
- Experiment 1: Simplify UPI entry with username/phone number recognition
- Experiment 2: Add a progress bar ("Step 2 of 3") to clarify flow
- Experiment 3: Offer biometric auth shortcut for returning users

### Scenario 2: Swiggy Reorder Habit

**Input:** Trigger 22%, Routine 31%, Reward 8%, D7 28%

**Expected Output:** Routine is broken (friction). Experiments: Quick Reorder button, show estimated delivery, gamify repeat orders.

### Scenario 3: Health App Workout Habit

**Input:** Trigger 45%, Routine 28%, Reward 5%, D7 12%

**Expected Output:** Trigger is broken (notification not motivating). Experiments: Personalize notification time, add social challenge, show progress vs friends.

---

## 8. Success Metrics

### Launch Metrics (1 week)

- **Adoption:** % of fintech PMs in our network who try the tool
- **Completion rate:** % who submit a complete habit loop
- **Actionability:** Qualitative—do PMs find the diagnosis + experiments useful?

### Long-term Metrics (4+ weeks)

- **Experiment rate:** % of PMs who run at least 1 recommended experiment
- **Metric movement:** Did experiments improve D7 retention by 3%+?
- **Time-to-hypothesis:** Did tool reduce analysis time by 30%+ vs manual methods?
- **NPS / qualitative feedback:** Would PMs recommend this to peers?

---

## 9. Requirements

### Must-Have (P0)

- Single habit loop analysis (3 stages)
- Correct diagnosis logic (identify highest-impact stage)
- 3 structured experiments output with IF/THEN/BECAUSE format
- Mobile-responsive form
- Category-aware experiment suggestions (fintech experiments differ from food delivery)
- Real Gemini API calls with fallback error handling

### Nice-to-Have (P1)

- Multiple habit loops per submission (v2)
- Pre-populated triggers/routines/rewards for fintech (v2)
- Export diagnosis as PDF
- Save favorite habits for quick re-analysis

### Future Considerations (P2)

- Habit drop-off benchmarks by category
- A/B test result import & comparison
- Integration with Amplitude / Mixpanel

---

## 10. Open Questions

1. **Should we pre-populate fintech triggers/routines?** Or keep completely custom? [Design decision needed]
2. **Should we show "absolute user loss" alongside "drop-off %"?** [Design/PM decision]
3. **What D7 impact threshold justifies a "High" severity?** [Data-driven decision]
4. **Should the tool work for B2B habits, or fintech/B2C only in v1?** [Scope decision]

---

## 11. Timeline & Phasing

### v1 (2 weeks)
- Single habit loop, 3-stage analysis
- Gemini API integration
- 3 experiments output
- Mobile-responsive UI

### v2 (future)
- Multiple habit loops
- Category benchmarks
- PDF export

---

**END OF BUILD SPEC**
