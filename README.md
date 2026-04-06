# Habit Drop-off Analyser

**AI-Powered Habit Loop Diagnostic for B2C Fintech PMs**

![Status](https://img.shields.io/badge/status-production-brightgreen) ![React](https://img.shields.io/badge/react-19-blue) ![Vite](https://img.shields.io/badge/vite-latest-purple) ![Gemini API](https://img.shields.io/badge/gemini-2.5--flash-red) ![License](https://img.shields.io/badge/license-MIT-blue)

## Overview

The Habit Drop-off Analyser solves a critical problem for mid-level PMs at B2C fintech and payments platforms: **users complete their first transaction but fail to build recurring habits.**

**The Gap:** Activation metrics appear strong (D1 retention at 40%+), but D7 retention collapses to 15–25%. PMs see the funnel leak but lack frameworks to diagnose which stage of the habit loop is breaking and why. Manual diagnosis takes 2–3 weeks of analysis with data teams.

**The Solution:** Input your 3-stage habit loop (Trigger → Routine → Reward) with drop-off percentages at each stage, and receive:
- ✅ Instant bottleneck identification
- ✅ AI-generated causal explanation
- ✅ 3 confidence scores (Diagnosis %, Fix Impact %, Experiment Quality %)
- ✅ 3 category-aware experiments with hypothesis, implementation, metrics, expected impact

**Time to insight:** < 5 minutes (vs. 2–3 weeks manual)

## Key Features

### Instant Diagnosis
Identifies which of the 3 stages (Trigger, Routine, or Reward) has the highest drop-off and severity (Critical/High/Medium/Low).

### Why It's Broken
AI generates a 2–3 sentence narrative explaining the causal chain—not a list of observations, but a story of user behavior breakdown tied to your specific drop-off %, app category, and context.

### Confidence Scores
Three transparent metrics (70–100% range) that teach PMs selective AI trust:
- **Diagnosis Confidence:** How sure is the AI about which stage is the bottleneck?
- **Fix Impact Confidence:** If you fix this stage, will it move D7 retention meaningfully?
- **Experiment Quality Confidence:** Are the 3 experiments testable and specific?

### 3 Category-Aware Experiments
Each experiment includes:
- Clear hypothesis (IF [change] THEN [outcome] BECAUSE [psychology])
- Implementation guidance (what to A/B test, what to measure)
- Primary metric (stage completion rate, D7 retention, etc.)
- Expected D7 impact (conservative estimates: 2–7% range)
- Complexity estimate (Low/Medium/High)

Strategies differ by category:
- **Fintech:** Payment friction, trust barriers, speed optimization
- **Food Delivery:** Reorder friction, selection clarity, repeat incentives
- **Health:** Motivation barriers, social proof, streak/gamification
- **Shopping:** Browse-to-purchase friction, choice paralysis, cart abandonment

### Sample Scenarios
Pre-loaded examples for instant demo:
- **PhonePe UPI Send:** Trigger 15% → Routine 38% (CRITICAL) → Reward 12% (D7=18%)
- **Swiggy Reorder:** Trigger 22% → Routine 31% → Reward 8% (D7=28%)
- **Health App Workout:** Trigger 45% (CRITICAL) → Routine 28% → Reward 5% (D7=12%)

## Technical Architecture

### Frontend
- **React 19** with hooks and functional components
- **Vite** for fast module bundling and hot module replacement
- **CSS** with dark theme, responsive design (mobile-first)
- Form validation with inline error handling
- Dynamic stage input (user selects 3 stages, form renders dynamically)

### AI Integration
- **Google Gemini 2.5-flash** model for instant responses (~2–3 seconds)
- System prompt embeds PM frameworks (BJ Fogg's Tiny Habits, category-specific strategies)
- Structured JSON output for diagnosis, confidence scores, and experiments

### Deployment
- **Vercel** serverless (optional for production security)
- Global CDN, auto-scaling
- Environment-based API key management

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Google Gemini API key (free tier available)

### Installation
```bash
