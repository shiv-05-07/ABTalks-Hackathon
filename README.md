# ABTalks Redesign

Mobile-first redesign of the ABTalks 60-day coding challenge for Indian college students.

## Route Map

```
/
/dashboard
/day/12
```

Judges open these at **390px** width. Exact file: [`ROUTE_MAP.md`](./ROUTE_MAP.md).

## PS checklist

| Requirement | Status |
|-------------|--------|
| Landing `/` — trust, clarity, motivation | Yes |
| Dashboard — streak, today’s task, progress, completion, standing/achievements | Yes |
| Challenge Day `/day/12` — brief + GitHub + LinkedIn submission | Yes |
| Mobile-first 390px | Yes |
| Edge cases: first day / missed day / empty profile | Dashboard → “Preview edge cases” |
| Thoughtful idea | **Tonight’s Ritual** + **Comeback Protocol** + **Visibility Pulse** |
| Strong proof verification | Live GitHub API + strict LinkedIn post URL rules + clear failure alerts |
| Mocked data (no auth/DB) | `src/data/mockData.ts` + `src/data/mock.json` |

## Run

```bash
npm install
npm run dev
```

→ http://localhost:3000

## Verification

On `/day/12`:

- **Verify GitHub** hits GitHub’s public API (repo must exist + be public; commit SHA must belong to that repo).
- Invalid formats, profile-only LinkedIn links, private/missing repos, and repo/commit mismatches show precise danger alerts.
- Use **Try invalid URLs** / **Try profile (invalid)** buttons to demo failure states quickly.
- Canned demo repo (`arjunmehta/abtalks-60`) can still format-verify for the screenshot flow when live lookup 404s.

## Bonus (not in screenshot map)

`/report-card` — AI Report Card with live GitHub verify + Gemini/heuristic scoring.

## Hackathon eligibility

See [`AI_USAGE_LOG.md`](./AI_USAGE_LOG.md).
