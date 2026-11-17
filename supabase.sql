-- Jardim 3D · execute uma vez em Supabase → SQL Editor
create table if not exists public.jardim_docs (
  col        text not null,
  id         text not null,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (col, id)
);

alter table public.jardim_docs enable row level security;

-- Somente usuários autenticados leem e gravam. Sem login, nada é acessível.
drop policy if exists "jardim_autenticados" on public.jardim_docs;
create policy "jardim_autenticados" on public.jardim_docs
  for all to authenticated using (true) with check (true);
