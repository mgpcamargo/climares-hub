# CLIMARES Hub — Rede Interdisciplinar dos 11 Eixos (CEPID / FAPESP)

Plataforma interativa construída para combater silos entre os **11 Eixos Temáticos do CEPID CLIMARES** (sediado no IEE-USP), conectando pesquisadores de todas as instituições parceiras (USP, UNICAMP, CEMADEN, INPE, UNESP e rede associada) por meio de grafos vivos, sobreposição territorial e encaixes automáticos de **Ofertas ↔ Demandas**.

- **Idioma principal:** Português do Brasil (`PT-BR`), com alternância acessória para Inglês (`EN`).

## Principais Módulos

1. **Grafo da Rede (Observatório Canvas 60fps):** 3 layouts (*Anel dos 11 Eixos*, *Cascata de Impacto*, *Força Orgânica*), lente anti-silo (*Só Pontes entre Eixos*, *Pontes Latentes*), camadas de nós (*Territórios*, *Perigos*, *Dados/Ferramentas*, *Missões*), filtro por nível de carreira (ex.: pós-docs/doutorandos), foco em par de eixos e destaque *Ego*.
2. **Constelação dos 11 Eixos & Telemetria de Silos:** Constelação radial interativa + Matriz de Acoplamento 11×11 (identificando pares com alta sinergia latente e zero colaborações ativas), ranking de *Articuladores Transversais* e exportação de relatórios FAPESP (`.md` e `.csv`).
3. **Ofertas ↔ Demandas (Handshakes):** Pareamento automático entre o que cada pesquisador produz (ex.: projeções CMIP7, manchas SAR, modelos SWAT/CGE) e o que outros eixos precisam, com **Gerador de Apresentação** pronto para WhatsApp e E-mail.
4. **Mapa de Territórios Compartilhados:** Mapa real dos 27 estados brasileiros (`d3-geo`) revelando convergência de múltiplos eixos nas mesmas bacias e regiões críticas (*RMSP*, *Litoral Norte SP*, *Xingu*, *Cantareira/PCJ*, *RS 2024*, etc.).
5. **Pessoas & Acervo (CLIMARES Commons):** Diretório pesquisável com links para Lattes, ORCID, BV FAPESP, OpenAlex e catálogo de bases/ferramentas compartilhadas.
6. **Missões Transversais:** Iniciativas conjuntas com roda de cobertura dos 11 Eixos e cadeiras abertas para convidar grupos faltantes.

## Desenvolvimento Local

```bash
npm install
npm run dev
```

## Importando a Planilha Real do CLIMARES

- **No navegador:** clique em **Importar CSV / Sync** no topo do Hub, baixe o modelo `climares_equipe_modelo.csv` e suba o cadastro oficial da equipe.
- **Sincronização automática OpenAlex / ORCID:** coloque a lista com ORCIDs em `data/roster.json` e execute `npm run sync:openalex` (ou deixe o workflow `.github/workflows/sync-and-deploy.yml` rodar semanalmente).

## Publicação Online (Sem Conflito com `cmip7-downloader`)

O projeto usa `base: './'` no Vite, funcionando em qualquer subpasta ou domínio:

- **GitHub Project Pages (imediato):** crie um repositório `climares-hub`, faça push para `main` e ative **Settings → Pages → GitHub Actions**. Ficará online em `https://<seu-usuario>.github.io/climares-hub/` em paralelo ao `cmip7-downloader`.
- **GitHub Organization Pages (recomendado para o Centro):** crie a organização `climares-hub` para publicar em `https://climares-hub.github.io` (e futuramente apontar `hub.climares.usp.br` via CNAME).
- **Cloudflare Pages / Vercel:** conecte o repositório e use `npm run build` com diretório de saída `dist`.
