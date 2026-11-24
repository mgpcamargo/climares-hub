import { AxisId, MuralFolderId, MuralPost, MuralPostKind, MuralReply } from '../types';

export const GITHUB_REPO = 'mgpcamargo/climares-hub';

interface GitHubIssue {
  id: number;
  number: number;
  html_url: string;
  title: string;
  body: string | null;
  created_at: string;
  comments: number;
  user?: {
    login: string;
    avatar_url?: string;
  };
  labels: { name: string }[];
  pull_request?: unknown;
}

interface GitHubComment {
  id: number;
  body: string;
  created_at: string;
  user?: {
    login: string;
    avatar_url?: string;
  };
}

function formatDatePt(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso.slice(0, 10);
  }
}

function parseIssueToPost(issue: GitHubIssue): MuralPost {
  const labelNames = issue.labels.map((l) => l.name);

  let folderId: Exclude<MuralFolderId, 'all'> = 'general';
  for (const ln of labelNames) {
    if (ln.startsWith('folder:')) {
      folderId = ln.replace('folder:', '') as Exclude<MuralFolderId, 'all'>;
    }
  }

  let kind: MuralPostKind = 'discussion';
  for (const ln of labelNames) {
    if (ln.startsWith('kind:')) {
      const k = ln.replace('kind:', '') as MuralPostKind;
      if (['discussion', 'offer', 'need', 'paper'].includes(k)) {
        kind = k;
      }
    }
  }

  const rawBody = issue.body || '';
  // Parse optional structured header metadata `<!-- meta: {"authorName":...} -->`
  let authorName = issue.user?.login || 'Membro CLIMARES';
  let authorUnit: string | undefined;
  let authorAxis: AxisId | undefined;
  let authorResearcherId: string | undefined;
  let tags: string[] = [];
  let cleanBody = rawBody;

  const metaMatch = rawBody.match(/<!--\s*climares-meta:\s*(\{.*?\})\s*-->/s);
  if (metaMatch) {
    try {
      const meta = JSON.parse(metaMatch[1]);
      if (meta.authorName) authorName = meta.authorName;
      if (meta.authorUnit) authorUnit = meta.authorUnit;
      if (meta.authorAxis) authorAxis = Number(meta.authorAxis) as AxisId;
      if (meta.authorResearcherId) authorResearcherId = meta.authorResearcherId;
      if (Array.isArray(meta.tags)) tags = meta.tags;
    } catch {}
    cleanBody = rawBody.replace(metaMatch[0], '').trim();
  }

  return {
    id: `gh-${issue.number}`,
    issueNumber: issue.number,
    issueUrl: issue.html_url,
    folderId,
    kind,
    title: issue.title,
    authorName,
    authorResearcherId,
    authorUnit,
    authorAxis,
    authorAvatarUrl: issue.user?.avatar_url,
    createdAt: formatDatePt(issue.created_at),
    body: cleanBody,
    tags,
    pinned: labelNames.includes('pinned'),
    repliesCount: issue.comments || 0,
  };
}

/**
 * Fetches REAL live shared Mural posts directly from GitHub Issues API (CORS-enabled, public, shared across all users!).
 */
export async function fetchLiveMuralPosts(): Promise<MuralPost[]> {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/issues?labels=mural&state=open&per_page=80&sort=created&direction=desc`,
    {
      headers: { Accept: 'application/vnd.github+json' },
    }
  );
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status}`);
  }
  const issues: GitHubIssue[] = await res.json();
  return issues.filter((i) => !i.pull_request).map(parseIssueToPost);
}

/**
 * Fetches live comments/replies for a given Mural thread.
 */
export async function fetchLiveReplies(issueNumber: number): Promise<MuralReply[]> {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/issues/${issueNumber}/comments?per_page=50`,
    {
      headers: { Accept: 'application/vnd.github+json' },
    }
  );
  if (!res.ok) return [];
  const comments: GitHubComment[] = await res.json();
  return comments.map((c) => ({
    id: `ghc-${c.id}`,
    authorName: c.user?.login || 'Membro',
    authorAvatarUrl: c.user?.avatar_url,
    createdAt: formatDatePt(c.created_at),
    body: c.body,
  }));
}

/**
 * Builds a 1-click pre-filled GitHub Issue URL so any researcher with a GitHub account
 * publishes live to the shared Mural immediately (zero backend servers, 100% persistent & shared!).
 */
export function buildNewMuralIssueUrl(params: {
  folderId: Exclude<MuralFolderId, 'all'>;
  kind: MuralPostKind;
  title: string;
  body: string;
  authorName: string;
  authorUnit?: string;
  authorAxis?: AxisId;
  authorResearcherId?: string;
  tags?: string[];
}): string {
  const meta = JSON.stringify({
    authorName: params.authorName,
    authorUnit: params.authorUnit,
    authorAxis: params.authorAxis,
    authorResearcherId: params.authorResearcherId,
    tags: params.tags || [],
  });

  const fullBody = `${params.body.trim()}\n\n<!-- climares-meta: ${meta} -->`;
  const labels = ['mural', `folder:${params.folderId}`, `kind:${params.kind}`].join(',');

  const qs = new URLSearchParams({
    title: params.title.trim(),
    body: fullBody,
    labels,
  });

  return `https://github.com/${GITHUB_REPO}/issues/new?${qs.toString()}`;
}

/**
 * Builds a structured Profile Claim / Update URL (GitHub Issue or institutional Email fallback)
 * so real CLIMARES members can submit their verified photo, Lattes URL, and real Offers/Needs.
 */
export function buildProfileClaimUrls(params: {
  researcherId: string;
  researcherName: string;
  photoUrl: string;
  lattesUrl: string;
  orcid: string;
  offerText: string;
  needText: string;
}): { githubUrl: string; mailtoUrl: string } {
  const payload = JSON.stringify(
    {
      researcherId: params.researcherId,
      photoUrl: params.photoUrl || undefined,
      lattesUrl: params.lattesUrl || undefined,
      orcid: params.orcid || undefined,
      offer: params.offerText || undefined,
      need: params.needText || undefined,
    },
    null,
    2
  );

  const title = `[Perfil CLIMARES] Atualização: ${params.researcherName}`;
  const body = `Solicitação de atualização verificada de perfil no CLIMARES Hub:\n\n\`\`\`json\n${payload}\n\`\`\``;

  const ghQs = new URLSearchParams({
    title,
    body,
    labels: 'profile-update',
  });

  const mailQs = new URLSearchParams({
    subject: title,
    body,
  });

  return {
    githubUrl: `https://github.com/${GITHUB_REPO}/issues/new?${ghQs.toString()}`,
    mailtoUrl: `mailto:climares@iee.usp.br?${mailQs.toString()}`,
  };
}
