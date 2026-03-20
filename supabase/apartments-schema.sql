create table if not exists public.apartments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  slug text not null unique,
  title text not null,
  rooms int not null check (rooms > 0),
  floor int not null,
  price_eur int not null check (price_eur >= 0),
  area_useful numeric(10,2) not null check (area_useful > 0),
  area_built numeric(10,2) not null check (area_built > 0),
  availability text not null check (availability in ('disponibil', 'rezervat', 'vandut')),
  short_description text not null,
  images jsonb not null default '[]'::jsonb,
  plan_2d text not null,
  plan_3d text not null
);

create index if not exists apartments_slug_idx on public.apartments (slug);
create index if not exists apartments_availability_idx on public.apartments (availability);
create index if not exists apartments_price_idx on public.apartments (price_eur);
