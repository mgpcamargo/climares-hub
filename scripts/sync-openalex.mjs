#!/usr/bin/env node
/**
 * CLIMARES Hub — Sincronizador Automático OpenAlex / ORCID
 *
 * Lê um arquivo JSON de pesquisadores do CLIMARES (contendo ORCID e eixo primário),
 * consulta a API pública e gratuita do OpenAlex (https://api.openalex.org),
 * atualiza publicações recentes e reconstrói automaticamente as arestas reais de
 * coautoria intra-eixo e inter-eixos.
 *
 * Uso:
 *   node scripts/sync-openalex.mjs [caminho-do-roster.json] [caminho-saida.json]
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const MAILTO = process.env.OPENALEX_MAILTO || 'climares-hub@usp.br';
const INPUT_PATH = process.argv[2] || path.resolve('data/roster.json');
const OUTPUT_PATH = process.argv[3] || path.resolve('public/climares-synced.json');

async function fetchAuthorWorksByOrcid(orcid) {
  const clean = orcid.replace(/^https?:\/\/orcid\.org\//i, '').trim();
  const url = `https://api.openalex.org/works?filter=author.orcid:https://orcid.org/${clean}&sort=publication_year:desc&per-page=15&mailto=${encodeURIComponent(MAILTO)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`OpenAlex HTTP ${res.status} para ORCID ${clean}`);
  }
  const data = await res.json();
  return data.results || [];
}

async function main() {
  try {
    await fs.access(INPUT_PATH);
  } catch {
    console.log(
      `[sync-openalex] Arquivo ${INPUT_PATH} não encontrado. Crie data/roster.json (ou exporte o JSON pelo botão "Importar CSV / Sync" no Hub) para ativar a sincronização automática.`
    );
    return;
  }

  const raw = JSON.parse(await fs.readFile(INPUT_PATH, 'utf-8'));
  const researchers = Array.isArray(raw) ? raw : raw.researchers || [];

  const byOrcid = new Map();
  for (const r of researchers) {
    if (r.orcid) {
      byOrcid.set(r.orcid.replace(/^https?:\/\/orcid\.org\//i, '').trim().toLowerCase(), r);
    }
  }

  const coauthCounts = new Map();

  for (const r of researchers) {
    if (!r.orcid) continue;
    try {
      const works = await fetchAuthorWorksByOrcid(r.orcid);
      const pubs = [];

      for (const w of works) {
        const coAuthorIds = [];
        for (const auth of w.authorships || []) {
          const aOrcid = (auth.author?.orcid || '')
            .replace(/^https?:\/\/orcid\.org\//i, '')
            .trim()
            .toLowerCase();
          const partner = byOrcid.get(aOrcid);
          if (partner && partner.id !== r.id) {
            coAuthorIds.push(partner.id);
            const key = [r.id, partner.id].sort().join('::');
            const prev = coauthCounts.get(key) || { a: r.id, b: partner.id, count: 0, latestYear: 0 };
            prev.count += 1;
            prev.latestYear = Math.max(prev.latestYear, w.publication_year || 0);
            coauthCounts.set(key, prev);
          }
        }

        const hasCross = coAuthorIds.some((cid) => {
          const p = researchers.find((x) => x.id === cid);
          return p && p.primaryAxis !== r.primaryAxis;
        });

        pubs.push({
          title: w.display_name || w.title || 'Sem título',
          year: w.publication_year || new Date().getFullYear(),
          journal: w.primary_location?.source?.display_name || 'Periódico científico',
          doi: w.doi || undefined,
          coAuthorIds,
          crossAxis: hasCross,
        });
      }

      r.publications = pubs.slice(0, 10);
      console.log(`[sync-openalex] ${r.name}: ${pubs.length} obras sincronizadas.`);
      // Respeitar rate limit gentil do OpenAlex
      await new Promise((resolve) => setTimeout(resolve, 180));
    } catch (err) {
      console.warn(`[sync-openalex] Aviso para ${r.name}: ${err.message}`);
    }
  }

  const edges = [];
  let idx = 1;
  for (const [, info] of coauthCounts.entries()) {
    // Divide por 2 porque cada obra aparece nos dois autores
    const uniquePapers = Math.max(1, Math.round(info.count / 2));
    edges.push({
      id: `oa-${idx++}`,
      source: info.a,
      target: info.b,
      kind: 'coauthored',
      weight: Math.min(5, uniquePapers),
      label: {
        pt: `${uniquePapers} publicação(ões) em coautoria (OpenAlex)`,
        en: `${uniquePapers} co-authored publication(s) (OpenAlex)`,
      },
      year: info.latestYear || undefined,
    });
  }

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(
    OUTPUT_PATH,
    JSON.stringify(
      {
        syncedAt: new Date().toISOString(),
        researchers,
        edges,
      },
      null,
      2
    ),
    'utf-8'
  );
  console.log(`[sync-openalex] Concluído! ${researchers.length} pesquisadores e ${edges.length} arestas gravados em ${OUTPUT_PATH}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
