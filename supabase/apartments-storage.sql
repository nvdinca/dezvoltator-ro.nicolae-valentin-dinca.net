-- Creeaza bucket public pentru imagini apartamente.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'apartments',
  'apartments',
  true,
  8388608,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;
