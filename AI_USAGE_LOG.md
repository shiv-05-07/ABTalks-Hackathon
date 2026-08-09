# AI Usage Log — ABTalks Redesign

This log documents how AI tools were used to design and build this project. It is provided for hackathon **Stage 1 (Eligibility)** and **Stage 2 (Authenticity)** review.

## Tools used

| Tool | Role |
|------|------|
| Cursor Agent (Grok / multi-model workflow) | Primary pair-programmer for architecture, UI, routing, and feature implementation |
| Google Gemini API (`gemini-2.0-flash` / `gemini-1.5-flash`) | Runtime AI engine inside the **AI Report Card** feature |
| GitHub REST API | Runtime public-repo authenticity verification (not generative AI) |

## What AI helped build (feature ↔ prompt mapping)

| Product feature | How AI was used |
|-----------------|-----------------|
| Landing page (`/`) | Prompted redesign for mobile-first, brand-first hero, trust, how-it-works, tracks |
| Student dashboard (`/dashboard`) | Prompted edge-case modes (Day 1 / Missed / Empty), Tonight’s Ritual, Visibility Pulse |
| Challenge day (`/day/12`) | Prompted brief → GitHub → LinkedIn → submit workflow with late-night mobile UX |
| Comeback Protocol | Prompted a shame-free missed-day recovery experience |
| **AI Report Card (`/report-card`)** | Designed + implemented Gemini scoring, GitHub verify, heuristic fallback, recruiter metrics |
| Design system | Prompted CSS tokens, typography (Syne + Manrope + JetBrains Mono), motion, mobile 390px polish |
| Proof verification | Prompted live GitHub API checks + strict LinkedIn post URL rules with precise failure alerts |
| SPA routing / Vercel rewrites | Prompted client router + refresh-safe hosting for deep links |

## Prompt history (high level)

1. Analyze the full codebase and redesign ABTalks for the 60-day challenge PS (landing, dashboard, day/12), mobile-first, with thoughtful student features.
2. Implement an AI Report Card feature aligned to hackathon evaluation rules (eligibility, authenticity, judging quality), including accessible AI usage documentation.

Detailed chat transcripts live in the Cursor project history used during development.

## Runtime AI behavior (inside the shipped product)

**Route:** `/report-card`

1. Student pastes GitHub repo URL, optional commit URL, code snippet, LinkedIn caption, day #, minutes.
2. App calls GitHub REST API to confirm the repo is **public** and fetch latest commit metadata.
3. App sends structured context to Gemini and requests JSON scores + coaching.
4. If no API key / model failure → deterministic **heuristic engine** still produces a full report card.

Relevant files:

- `src/services/aiReportService.ts`
- `src/components/StudentReportCard.tsx`

## Authenticity notes for reviewers

- The repository was developed iteratively during the hackathon window (landing → dashboard → day flow → AI report card).
- The AI Usage Log corresponds to implemented features above — especially the Report Card, which is not a stub: it performs live GitHub verification and Gemini/heuristic analysis.
- Mock student data is used only where the PS forbids auth/DB; the AI Report Card can analyze **real public GitHub repositories**.

## Environment

```bash
# Required for live Gemini scoring (heuristic fallback works without it)
GEMINI_API_KEY=your_key_here
# or
VITE_GEMINI_API_KEY=your_key_here
```

## Human ownership

All product decisions (information architecture, thoughtful features, visual direction, edge cases, hackathon route map) were directed by the team. AI accelerated implementation and iteration; it did not replace product judgment.
