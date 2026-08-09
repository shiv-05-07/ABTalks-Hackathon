import {
  AIProofAnalysisResult,
  GitHubVerification,
  SubmissionProofInput,
} from '../types';

function getGeminiKey(): string | undefined {
  const env = import.meta.env as Record<string, string | undefined>;
  return env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY;
}

function parseGithubUrl(url: string): { owner: string; repo: string } | null {
  try {
    const cleaned = url.trim().replace(/\.git$/, '');
    const match = cleaned.match(/github\.com\/([^/]+)\/([^/#?]+)/i);
    if (!match) return null;
    return { owner: match[1], repo: match[2] };
  } catch {
    return null;
  }
}

export async function verifyGitHubRepo(
  githubUrl: string,
  commitUrl?: string
): Promise<GitHubVerification> {
  const parsed = parseGithubUrl(githubUrl);
  if (!parsed) {
    throw new Error('Enter a valid GitHub repository URL (https://github.com/owner/repo).');
  }

  const repoRes = await fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`, {
    headers: { Accept: 'application/vnd.github+json' },
  });

  if (repoRes.status === 404) {
    throw new Error('Repository not found or private. It must be public for verification.');
  }
  if (!repoRes.ok) {
    throw new Error(`GitHub verification failed (${repoRes.status}). Try again in a moment.`);
  }

  const repo = await repoRes.json();
  if (repo.private) {
    throw new Error('Repository is private. Make it public to verify proof of work.');
  }

  let commitSha = '';
  let commitMessage = 'Latest commit';
  let commitAuthor = parsed.owner;
  let commitDate = new Date().toISOString();

  const commitShaFromUrl = commitUrl?.match(/\/commit\/([a-f0-9]{7,40})/i)?.[1];

  const commitsRes = await fetch(
    `https://api.github.com/repos/${parsed.owner}/${parsed.repo}/commits?per_page=5`,
    { headers: { Accept: 'application/vnd.github+json' } }
  );

  if (commitsRes.ok) {
    const commits = await commitsRes.json();
    const chosen =
      (commitShaFromUrl &&
        commits.find((c: { sha: string }) => c.sha.startsWith(commitShaFromUrl))) ||
      commits[0];

    if (chosen) {
      commitSha = String(chosen.sha).slice(0, 7);
      commitMessage = chosen.commit?.message?.split('\n')[0] || commitMessage;
      commitAuthor = chosen.commit?.author?.name || chosen.author?.login || commitAuthor;
      commitDate = chosen.commit?.author?.date || commitDate;
    }
  }

  if (!commitSha && commitShaFromUrl) {
    commitSha = commitShaFromUrl.slice(0, 7);
  }

  return {
    fullName: repo.full_name,
    description: repo.description,
    stars: repo.stargazers_count ?? 0,
    language: repo.language,
    htmlUrl: repo.html_url,
    commitSha: commitSha || '———',
    commitMessage,
    commitAuthor,
    commitDate,
    isPublic: true,
  };
}

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(n)));
}

function bandFor(score: number): string {
  if (score >= 90) return 'High Distinction';
  if (score >= 80) return 'Verified Builder';
  if (score >= 70) return 'Rising Signal';
  if (score >= 55) return 'Developing';
  return 'Needs Focus';
}

function badgeFor(score: number, dayId: number): string {
  if (score >= 90) return `Day ${dayId} · Elite Ship`;
  if (score >= 80) return `Day ${dayId} · Recruiter Ready`;
  if (score >= 70) return `Day ${dayId} · Solid Proof`;
  return `Day ${dayId} · Keep Shipping`;
}

export function heuristicAnalyze(
  input: SubmissionProofInput,
  verified?: GitHubVerification
): AIProofAnalysisResult {
  const code = input.codeSnippet.trim();
  const post = input.linkedinPostText.trim();
  const lines = code.split('\n').filter(Boolean);

  let codeScore = 52;
  if (code.length > 80) codeScore += 8;
  if (code.length > 220) codeScore += 8;
  if (lines.length >= 8) codeScore += 6;
  if (/function|const|=>|class|export|import/.test(code)) codeScore += 8;
  if (/try|catch|optional|undefined|null|\?\.|error/i.test(code)) codeScore += 6;
  if (/test|describe|expect|assert/i.test(code)) codeScore += 5;
  if (/TODO|console\.log\(/i.test(code)) codeScore -= 4;
  if (verified) codeScore += 6;

  let pitchScore = 48;
  if (post.length > 40) pitchScore += 8;
  if (post.length > 120) pitchScore += 8;
  if (/day\s*\d+/i.test(post)) pitchScore += 6;
  if (/learned|built|shipped|recruiter|readme|github/i.test(post)) pitchScore += 8;
  if (/#\w+/.test(post)) pitchScore += 4;
  if (post.split(/[.!?]/).filter(Boolean).length >= 2) pitchScore += 5;
  if (post.length < 30) pitchScore -= 10;

  const timeFactor =
    input.timeSpentMinutes <= 0
      ? 60
      : input.timeSpentMinutes <= 45
        ? 86
        : input.timeSpentMinutes <= 75
          ? 78
          : 68;

  codeScore = clamp(codeScore);
  pitchScore = clamp(pitchScore);

  const recruiterReadiness = clamp(codeScore * 0.45 + pitchScore * 0.4 + timeFactor * 0.15);
  const consistencySignal = clamp(
    (verified ? 78 : 55) + ( /day\s*\d+/i.test(post) ? 10 : 0) + (input.dayId >= 7 ? 6 : 0)
  );
  const overall = clamp(codeScore * 0.4 + pitchScore * 0.35 + recruiterReadiness * 0.25);

  const strengths: string[] = [];
  const improvements: string[] = [];

  if (/export|import|const|function/.test(code)) {
    strengths.push('Clear modular structure recruiters can skim quickly');
  }
  if (verified) {
    strengths.push(`Public repo verified: ${verified.fullName}`);
  }
  if (lines.length >= 10) {
    strengths.push('Enough implementation depth to show real ownership');
  }
  if (strengths.length === 0) {
    strengths.push('Submission captured — foundation is in place');
  }

  if (code.length < 120) {
    improvements.push('Paste a larger slice of the day’s work for stronger code signals');
  }
  if (!/try|catch|\?\.|error/i.test(code)) {
    improvements.push('Add one edge-case or error path to show production thinking');
  }
  if (post.length < 80) {
    improvements.push('Expand the LinkedIn post with one concrete learning and outcome');
  }
  if (!/day\s*\d+/i.test(post)) {
    improvements.push('Mention the day number so your streak narrative is obvious');
  }

  return {
    dayId: input.dayId,
    overallScore: overall,
    performanceBand: bandFor(overall),
    isVerified: Boolean(verified),
    codeQualityScore: codeScore,
    linkedinPitchScore: pitchScore,
    recruiterReadiness,
    consistencySignal,
    codeReview: {
      strengths: strengths.slice(0, 3),
      improvements: improvements.slice(0, 3),
      eleganceSummary: verified
        ? `Verified public work on ${verified.fullName}. The submission reads as intentional daily shipping with room to sharpen polish.`
        : 'Heuristic review of the pasted snippet. Verify a public GitHub repo to unlock a stronger authenticity signal.',
    },
    linkedinFeedback: {
      visibilityTip: /day\s*\d+/i.test(post)
        ? 'Lead with the day number and end with a clear ask or takeaway.'
        : 'Open with “Day X/60” so recruiters instantly understand the commitment.',
      recruiterAppeal:
        pitchScore >= 80 ? 'High Impact' : pitchScore >= 65 ? 'Solid Signal' : 'Needs Hook',
      suggestion:
        'Pair what you built + why it matters + one learning. Keep it under 8 lines for mobile skimming.',
      hookScore: clamp(pitchScore - 4),
    },
    skillSignals: Array.from(
      new Set(
        [
          verified?.language,
          /react|jsx|tsx/i.test(code) ? 'React' : null,
          /typescript|interface|type /i.test(code) ? 'TypeScript' : null,
          /readme|documentation/i.test(post + code) ? 'Communication' : null,
          'Public Building',
          input.track,
        ].filter(Boolean) as string[]
      )
    ).slice(0, 5),
    timeEfficiencyNote:
      input.timeSpentMinutes > 0
        ? `${input.timeSpentMinutes} minutes logged — ${
            input.timeSpentMinutes <= 45
              ? 'sharp execution for a nightly ritual.'
              : 'solid effort; next time scope a thinner slice and ship earlier.'
          }`
        : 'Add time spent to calibrate efficiency feedback.',
    generatedBadge: badgeFor(overall, input.dayId),
    nextMove:
      overall >= 80
        ? 'Ship tomorrow’s ritual before midnight to compound your Visibility Pulse.'
        : 'Rewrite the LinkedIn hook and add one stronger code edge-case, then regenerate.',
    verifiedRepo: verified,
    engine: 'heuristic',
  };
}

async function callGemini(
  input: SubmissionProofInput,
  verified?: GitHubVerification
): Promise<AIProofAnalysisResult | null> {
  const apiKey = getGeminiKey();
  if (!apiKey) return null;

  const prompt = `You are an elite engineering career coach evaluating an ABTalks 60-day challenge submission for an Indian college student.

Return ONLY valid JSON with this exact shape:
{
  "overallScore": number 0-100,
  "performanceBand": string,
  "codeQualityScore": number 0-100,
  "linkedinPitchScore": number 0-100,
  "recruiterReadiness": number 0-100,
  "consistencySignal": number 0-100,
  "codeReview": {
    "strengths": string[3],
    "improvements": string[3],
    "eleganceSummary": string
  },
  "linkedinFeedback": {
    "visibilityTip": string,
    "recruiterAppeal": "High Impact" | "Solid Signal" | "Needs Hook",
    "suggestion": string,
    "hookScore": number 0-100
  },
  "skillSignals": string[3-5],
  "timeEfficiencyNote": string,
  "generatedBadge": string,
  "nextMove": string
}

Student: ${input.studentName}
Track: ${input.track}
Day: ${input.dayId}
Minutes: ${input.timeSpentMinutes}
GitHub: ${input.githubUrl}
Commit: ${input.commitUrl || 'n/a'}
Verified repo: ${verified ? JSON.stringify(verified) : 'not verified'}
Code snippet:
\`\`\`
${input.codeSnippet.slice(0, 4500)}
\`\`\`
LinkedIn post:
"""
${input.linkedinPostText.slice(0, 2000)}
"""

Scoring rubric:
- Reward clarity, ownership, recruiter-readable storytelling, and evidence of real daily shipping.
- Penalize empty buzzwords, missing day context, and tiny/non-specific code.
- Be encouraging but honest. No markdown fences. JSON only.`;

  const models = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-2.0-flash-lite'];

  for (const model of models) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.4,
              responseMimeType: 'application/json',
            },
          }),
        }
      );

      if (!res.ok) continue;

      const data = await res.json();
      const text: string =
        data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || '').join('') ||
        '';

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) continue;

      const parsed = JSON.parse(jsonMatch[0]);
      const overall = clamp(Number(parsed.overallScore) || 70);

      return {
        dayId: input.dayId,
        overallScore: overall,
        performanceBand: String(parsed.performanceBand || bandFor(overall)),
        isVerified: Boolean(verified),
        codeQualityScore: clamp(Number(parsed.codeQualityScore) || overall - 2),
        linkedinPitchScore: clamp(Number(parsed.linkedinPitchScore) || overall - 4),
        recruiterReadiness: clamp(Number(parsed.recruiterReadiness) || overall),
        consistencySignal: clamp(Number(parsed.consistencySignal) || (verified ? 80 : 60)),
        codeReview: {
          strengths: (parsed.codeReview?.strengths || []).slice(0, 3),
          improvements: (parsed.codeReview?.improvements || []).slice(0, 3),
          eleganceSummary: String(parsed.codeReview?.eleganceSummary || ''),
        },
        linkedinFeedback: {
          visibilityTip: String(parsed.linkedinFeedback?.visibilityTip || ''),
          recruiterAppeal: String(parsed.linkedinFeedback?.recruiterAppeal || 'Solid Signal'),
          suggestion: String(parsed.linkedinFeedback?.suggestion || ''),
          hookScore: clamp(Number(parsed.linkedinFeedback?.hookScore) || 70),
        },
        skillSignals: (parsed.skillSignals || []).slice(0, 5),
        timeEfficiencyNote: String(parsed.timeEfficiencyNote || ''),
        generatedBadge: String(parsed.generatedBadge || badgeFor(overall, input.dayId)),
        nextMove: String(parsed.nextMove || ''),
        verifiedRepo: verified,
        engine: 'gemini',
      };
    } catch {
      // try next model
    }
  }

  return null;
}

export async function analyzeDailySubmission(
  input: SubmissionProofInput
): Promise<AIProofAnalysisResult> {
  let verified: GitHubVerification | undefined;

  try {
    verified = await verifyGitHubRepo(input.githubUrl, input.commitUrl);
  } catch (err) {
    // Allow analysis without verification, but surface later via isVerified=false
    if (!input.codeSnippet.trim() && !input.linkedinPostText.trim()) {
      throw err instanceof Error ? err : new Error('GitHub verification failed.');
    }
  }

  const ai = await callGemini(input, verified);
  if (ai) {
    if (!ai.codeReview.strengths.length || !ai.codeReview.improvements.length) {
      const fallback = heuristicAnalyze(input, verified);
      return {
        ...ai,
        codeReview: {
          strengths: ai.codeReview.strengths.length
            ? ai.codeReview.strengths
            : fallback.codeReview.strengths,
          improvements: ai.codeReview.improvements.length
            ? ai.codeReview.improvements
            : fallback.codeReview.improvements,
          eleganceSummary:
            ai.codeReview.eleganceSummary || fallback.codeReview.eleganceSummary,
        },
      };
    }
    return ai;
  }

  return heuristicAnalyze(input, verified);
}
