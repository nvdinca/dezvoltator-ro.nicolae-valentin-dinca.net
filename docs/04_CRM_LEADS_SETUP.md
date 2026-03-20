# CRM Leads Setup (Ziua 5)

## 1) Creeaza tabelul in Supabase

Ruleaza SQL-ul din:

- `supabase/leads-schema.sql`

## 2) Configureaza variabilele de mediu

Copiaza `.env.example` in `.env.local` si completeaza:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_LEADS_KEY`

## 3) Endpoint API

- `POST /api/lead`
- body:
  - `name`
  - `email`
  - `phone`
  - `source` (optional)

## 4) Formulare conectate

- Landing home: `ContactStickyForm`
- Campanii: pagina `campanii/[slug]`

Ambele folosesc componenta:

- `src/components/forms/LeadCaptureForm.tsx`

## 5) Pagina interna CRM

- URL: `/admin/leads?key=ADMIN_LEADS_KEY`

Afiseaza lead-urile salvate in Supabase, ordonate descrescator dupa data.
