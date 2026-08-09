export type ProofField =
  | 'repo'
  | 'commit'
  | 'linkedin'
  | 'repo_commit_mismatch'
  | 'network'
  | 'private'
  | 'not_found';

export interface ProofVerifyIssue {
  field: ProofField;
  title: string;
  body: string;
}

export interface ParsedGithubRepo {
  owner: string;
  repo: string;
  htmlUrl: string;
}

export interface ParsedGithubCommit {
  owner: string;
  repo: string;
  sha: string;
  htmlUrl: string;
}

export interface GithubLiveProof {
  fullName: string;
  description: string | null;
  stars: number;
  language: string | null;
  htmlUrl: string;
  isPublic: boolean;
  commitSha: string;
  commitMessage: string;
  commitAuthor: string;
  commitDate: string;
  commitHtmlUrl: string;
}

export interface LinkedinProofMeta {
  kind: 'post' | 'activity' | 'feed' | 'ugc';
  normalizedUrl: string;
}

function trimUrl(raw: string): string {
  return raw.trim().replace(/[)>.,]+$/g, '');
}

export function parseGithubRepoUrl(raw: string): ParsedGithubRepo | null {
  const url = trimUrl(raw);
  if (!url) return null;

  try {
    const withProtocol = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    const u = new URL(withProtocol);
    if (!/^(www\.)?github\.com$/i.test(u.hostname)) return null;

    const parts = u.pathname.split('/').filter(Boolean);
    if (parts.length < 2) return null;

    const [owner, repoRaw] = parts;
    if (!owner || !repoRaw) return null;
    if (/^(settings|orgs|marketplace|explore|topics|features|pricing|about)$/i.test(owner)) {
      return null;
    }

    const repo = repoRaw.replace(/\.git$/i, '');
    if (!/^[\w.-]+$/.test(owner) || !/^[\w.-]+$/.test(repo)) return null;

    return {
      owner,
      repo,
      htmlUrl: `https://github.com/${owner}/${repo}`,
    };
  } catch {
    return null;
  }
}

export function parseGithubCommitUrl(raw: string): ParsedGithubCommit | null {
  const url = trimUrl(raw);
  if (!url) return null;

  try {
    const withProtocol = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    const u = new URL(withProtocol);
    if (!/^(www\.)?github\.com$/i.test(u.hostname)) return null;

    const match = u.pathname.match(/^\/([^/]+)\/([^/]+)\/commit\/([a-f0-9]{7,40})\/?$/i);
    if (!match) return null;

    const [, owner, repoRaw, sha] = match;
    const repo = repoRaw.replace(/\.git$/i, '');

    return {
      owner,
      repo,
      sha,
      htmlUrl: `https://github.com/${owner}/${repo}/commit/${sha}`,
    };
  } catch {
    return null;
  }
}

export function validateGithubFormats(
  repoUrl: string,
  commitUrl: string
): ProofVerifyIssue | null {
  if (!trimUrl(repoUrl) && !trimUrl(commitUrl)) {
    return {
      field: 'repo',
      title: 'GitHub links are missing',
      body: 'Paste both a public repository URL and today’s commit URL before verifying.',
    };
  }

  if (!trimUrl(repoUrl)) {
    return {
      field: 'repo',
      title: 'Repository URL is required',
      body: 'Example: https://github.com/yourname/abtalks-60 — the repo must be public.',
    };
  }

  if (!trimUrl(commitUrl)) {
    return {
      field: 'commit',
      title: 'Commit URL is required',
      body: 'Open today’s commit on GitHub, then copy the full address bar link that includes /commit/…',
    };
  }

  const repo = parseGithubRepoUrl(repoUrl);
  if (!repo) {
    return {
      field: 'repo',
      title: 'Repository URL isn’t valid',
      body: 'Use a public GitHub repo link like https://github.com/username/repo — not a gist, profile, or random website.',
    };
  }

  const commit = parseGithubCommitUrl(commitUrl);
  if (!commit) {
    return {
      field: 'commit',
      title: 'Commit URL isn’t verifiable',
      body: 'Paste a commit link with /commit/ and a SHA (7–40 hex characters). Tree, PR, or compare URLs won’t count.',
    };
  }

  if (
    repo.owner.toLowerCase() !== commit.owner.toLowerCase() ||
    repo.repo.toLowerCase() !== commit.repo.toLowerCase()
  ) {
    return {
      field: 'repo_commit_mismatch',
      title: 'Repo and commit don’t match',
      body: `Your commit points to ${commit.owner}/${commit.repo}, but the repository field is ${repo.owner}/${repo.repo}. They must be the same project.`,
    };
  }

  return null;
}

export function parseLinkedinPostUrl(raw: string): LinkedinProofMeta | null {
  const url = trimUrl(raw);
  if (!url) return null;

  try {
    const withProtocol = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    const u = new URL(withProtocol);
    if (!/(^|\.)linkedin\.com$/i.test(u.hostname)) return null;

    const path = u.pathname.replace(/\/+$/, '');

    // Profile homepage alone is not proof
    if (/^\/in\/[^/]+$/i.test(path)) return null;
    if (/^\/company\/[^/]+$/i.test(path)) return null;
    if (/^\/school\/[^/]+$/i.test(path)) return null;

    if (/^\/posts\//i.test(path)) {
      return { kind: 'post', normalizedUrl: u.toString() };
    }
    if (/\/activity-\d+/i.test(path) || /\/detail\/activity\//i.test(path)) {
      return { kind: 'activity', normalizedUrl: u.toString() };
    }
    if (/^\/feed\/update\//i.test(path)) {
      return { kind: 'feed', normalizedUrl: u.toString() };
    }
    if (/\/ugcPost\//i.test(path) || /ugcPost-/i.test(path + u.search)) {
      return { kind: 'ugc', normalizedUrl: u.toString() };
    }

    return null;
  } catch {
    return null;
  }
}

export function validateLinkedinFormat(linkedinUrl: string): ProofVerifyIssue | null {
  if (!trimUrl(linkedinUrl)) {
    return {
      field: 'linkedin',
      title: 'LinkedIn post URL is missing',
      body: 'Publish your post, open it, tap Share → Copy link, then paste that URL here.',
    };
  }

  const profileOnly = (() => {
    try {
      const withProtocol = /^https?:\/\//i.test(linkedinUrl.trim())
        ? linkedinUrl.trim()
        : `https://${linkedinUrl.trim()}`;
      const u = new URL(withProtocol);
      const path = u.pathname.replace(/\/+$/, '');
      return /(^|\.)linkedin\.com$/i.test(u.hostname) && /^\/in\/[^/]+$/i.test(path);
    } catch {
      return false;
    }
  })();

  if (profileOnly) {
    return {
      field: 'linkedin',
      title: 'That’s a profile — not a post',
      body: 'Your LinkedIn homepage can’t prove today’s work. Paste the specific post URL (posts/…, activity-…, or feed/update/…).',
    };
  }

  if (!parseLinkedinPostUrl(linkedinUrl)) {
    return {
      field: 'linkedin',
      title: 'LinkedIn URL isn’t a post link',
      body: 'Accepted formats: linkedin.com/posts/…, activity-… links, or feed/update/… Share → Copy link after publishing.',
    };
  }

  return null;
}

async function githubFetch(path: string): Promise<Response> {
  return fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
}

export async function verifyGithubProofLive(
  repoUrl: string,
  commitUrl: string
): Promise<{ ok: true; proof: GithubLiveProof } | { ok: false; issue: ProofVerifyIssue }> {
  const formatIssue = validateGithubFormats(repoUrl, commitUrl);
  if (formatIssue) return { ok: false, issue: formatIssue };

  const repo = parseGithubRepoUrl(repoUrl)!;
  const commit = parseGithubCommitUrl(commitUrl)!;

  let repoRes: Response;
  try {
    repoRes = await githubFetch(`/repos/${repo.owner}/${repo.repo}`);
  } catch {
    return {
      ok: false,
      issue: {
        field: 'network',
        title: 'Couldn’t reach GitHub',
        body: 'Check your connection and try again. Verification needs a live lookup of the public repository.',
      },
    };
  }

  if (repoRes.status === 404) {
    return {
      ok: false,
      issue: {
        field: 'not_found',
        title: 'Repository not found (or private)',
        body: `${repo.owner}/${repo.repo} isn’t reachable via GitHub’s public API. Make the repo public, double-check the name, then re-verify.`,
      },
    };
  }

  if (repoRes.status === 403) {
    return {
      ok: false,
      issue: {
        field: 'network',
        title: 'GitHub rate limit hit',
        body: 'Too many verification checks in a short window. Wait a minute, then try again.',
      },
    };
  }

  if (!repoRes.ok) {
    return {
      ok: false,
      issue: {
        field: 'network',
        title: `GitHub returned ${repoRes.status}`,
        body: 'Verification failed unexpectedly. Confirm the repo is public and try again.',
      },
    };
  }

  const repoJson = await repoRes.json();
  if (repoJson.private) {
    return {
      ok: false,
      issue: {
        field: 'private',
        title: 'Repository is private',
        body: 'Recruiters can’t open private proof. Switch visibility to Public, then verify again.',
      },
    };
  }

  let commitRes: Response;
  try {
    commitRes = await githubFetch(`/repos/${repo.owner}/${repo.repo}/commits/${commit.sha}`);
  } catch {
    return {
      ok: false,
      issue: {
        field: 'network',
        title: 'Couldn’t verify the commit',
        body: 'Network error while looking up the commit SHA. Try again in a moment.',
      },
    };
  }

  if (commitRes.status === 404 || commitRes.status === 422) {
    return {
      ok: false,
      issue: {
        field: 'commit',
        title: 'Commit SHA not found in this repo',
        body: `No commit matching ${commit.sha} exists on ${repo.owner}/${repo.repo}. Copy the commit URL from this repository’s history.`,
      },
    };
  }

  if (!commitRes.ok) {
    return {
      ok: false,
      issue: {
        field: 'commit',
        title: 'Commit lookup failed',
        body: `GitHub couldn’t confirm that commit (${commitRes.status}). Re-copy the commit link and try again.`,
      },
    };
  }

  const commitJson = await commitRes.json();
  const fullSha = String(commitJson.sha || commit.sha);

  return {
    ok: true,
    proof: {
      fullName: repoJson.full_name,
      description: repoJson.description ?? null,
      stars: repoJson.stargazers_count ?? 0,
      language: repoJson.language ?? null,
      htmlUrl: repoJson.html_url,
      isPublic: true,
      commitSha: fullSha.slice(0, 7),
      commitMessage: String(commitJson.commit?.message || '').split('\n')[0] || 'Commit verified',
      commitAuthor:
        commitJson.commit?.author?.name || commitJson.author?.login || repo.owner,
      commitDate: commitJson.commit?.author?.date || new Date().toISOString(),
      commitHtmlUrl: commitJson.html_url || commit.htmlUrl,
    },
  };
}

export async function verifyLinkedinProof(
  linkedinUrl: string
): Promise<{ ok: true; meta: LinkedinProofMeta } | { ok: false; issue: ProofVerifyIssue }> {
  const issue = validateLinkedinFormat(linkedinUrl);
  if (issue) return { ok: false, issue };

  // Simulate a short “proof check” so the UI feels intentional.
  await new Promise((r) => setTimeout(r, 700));

  const meta = parseLinkedinPostUrl(linkedinUrl)!;
  return { ok: true, meta };
}

/** Demo-friendly verify: live GitHub when possible; clear failure for fake demo URLs. */
export async function verifyGithubProof(
  repoUrl: string,
  commitUrl: string,
  options?: { allowFormatOnlyDemo?: boolean }
): Promise<
  | { ok: true; proof: GithubLiveProof; mode: 'live' | 'format' }
  | { ok: false; issue: ProofVerifyIssue }
> {
  const live = await verifyGithubProofLive(repoUrl, commitUrl);
  if (live.ok === true) {
    return { ok: true, proof: live.proof, mode: 'live' };
  }

  const issue: ProofVerifyIssue = live.issue;

  // Optional demo path: only when explicitly allowed AND the failure is "not found"
  // for the canned mock student repo — still prefer showing the real failure.
  if (
    options?.allowFormatOnlyDemo &&
    issue.field === 'not_found' &&
    /arjunmehta\/abtalks-60/i.test(repoUrl)
  ) {
    const formatIssue = validateGithubFormats(repoUrl, commitUrl);
    if (formatIssue) return { ok: false, issue: formatIssue };
    const repo = parseGithubRepoUrl(repoUrl)!;
    const commit = parseGithubCommitUrl(commitUrl)!;
    return {
      ok: true,
      mode: 'format',
      proof: {
        fullName: `${repo.owner}/${repo.repo}`,
        description: 'Demo challenge repository (format-verified)',
        stars: 0,
        language: 'TypeScript',
        htmlUrl: repo.htmlUrl,
        isPublic: true,
        commitSha: commit.sha.slice(0, 7),
        commitMessage: 'Day proof commit',
        commitAuthor: repo.owner,
        commitDate: new Date().toISOString(),
        commitHtmlUrl: commit.htmlUrl,
      },
    };
  }

  return { ok: false, issue };
}
