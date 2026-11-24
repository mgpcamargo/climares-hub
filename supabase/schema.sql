-- CLIMARES Hub v2.0 — Supabase Schema (Optional Upgrade from Built-in GitHub Live Backend)
-- Enables institutional Magic-Link Auth (@usp.br, @unicamp.br, @cemaden.gov.br, @inpe.br, etc.)
-- and real-time self-service profile claiming, photo uploads, and Mural threads/replies.

create table if not exists public.member_claims (
  researcher_id text primary key,
  user_id uuid references auth.users(id) on delete set null,
  email text,
  photo_url text,
  lattes_url text,
  orcid text,
  bio_pt text,
  offers jsonb default '[]'::jsonb,
  needs jsonb default '[]'::jsonb,
  updated_at timestamptz default now()
);

create table if not exists public.mural_posts (
  id uuid primary key default gen_random_uuid(),
  folder_id text not null default 'general',
  post_kind text not null default 'discussion', -- 'discussion' | 'offer' | 'need' | 'paper'
  title text not null,
  body text not null,
  author_researcher_id text,
  author_name text not null,
  author_unit text,
  author_axis smallint,
  tags text[] default '{}',
  pinned boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.mural_replies (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.mural_posts(id) on delete cascade,
  author_researcher_id text,
  author_name text not null,
  author_axis smallint,
  body text not null,
  created_at timestamptz default now()
);

alter table public.member_claims enable row level security;
alter table public.mural_posts enable row level security;
alter table public.mural_replies enable row level security;

create policy "Public read member_claims" on public.member_claims for select using (true);
create policy "Public read mural_posts" on public.mural_posts for select using (true);
create policy "Public read mural_replies" on public.mural_replies for select using (true);

create policy "Authenticated insert mural_posts" on public.mural_posts
  for insert to authenticated with check (true);

create policy "Authenticated insert mural_replies" on public.mural_replies
  for insert to authenticated with check (true);

create policy "Owner upsert member_claims" on public.member_claims
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
