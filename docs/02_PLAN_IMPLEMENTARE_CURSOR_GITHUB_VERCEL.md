# Plan implementare - Cursor + GitHub + Vercel

Acest document descrie stack-ul tehnic si pasii concreti pentru implementarea portofoliului web pentru dezvoltatori imobiliari din Romania.

## 1) Stack recomandat

- Framework: Next.js (App Router) + TypeScript
- Styling/UI: Tailwind CSS + componente UI reutilizabile
- Formulare: React Hook Form + Zod
- Date/Lead-uri: Supabase (Postgres) sau integrare CRM
- Media: optimizare imagini cu next/image (optional Cloudinary)
- Analytics: GA4 + Meta Pixel (prin GTM)
- Deploy: Vercel (deploy automat din GitHub)

## 2) Setup initial

1. Creeaza proiectul:
   - `npx create-next-app@latest . --ts --tailwind --eslint --app`
2. Initializeaza git:
   - `git init`
   - `git add .`
   - `git commit -m "Initial Next.js setup"`
3. Creeaza repository pe GitHub si conecteaza remote:
   - `git remote add origin <repo-url>`
   - `git branch -M main`
   - `git push -u origin main`
4. Import in Vercel:
   - Import project din GitHub
   - Verifica detectia Next.js
   - Deploy

## 3) Structura recomandata

```txt
src/
  app/
    layout.tsx
    page.tsx
    multumim/page.tsx
    apartamente/[slug]/page.tsx
    campanii/[slug]/page.tsx
    api/lead/route.ts
  components/
    layout/Navbar.tsx
    layout/Footer.tsx
    sections/HeroProject.tsx
    sections/WhyProject.tsx
    sections/PlansFacilitiesMap.tsx
    sections/ContactStickyForm.tsx
    sections/ApartmentGallery.tsx
    sections/ApartmentDetails.tsx
    sections/CampaignHero.tsx
    sections/CaseStudyBlock.tsx
    ui/Button.tsx
    ui/Input.tsx
    ui/Textarea.tsx
  lib/
    data/projects.ts
    data/apartments.ts
    data/campaigns.ts
    validations/leadSchema.ts
    analytics/track.ts
```

## 4) Pagini principale

### Landing ansamblu (`/`)
- Hero cu randari + CTA principal
- Sectiune "De ce acest proiect?"
- Planuri, facilitati, harta
- Formular vizibil (desktop + mobil)

### Pagina apartament (`/apartamente/[slug]`)
- Galerie foto mare
- Plan 2D/3D
- Pret, suprafete, disponibilitate
- CTA: "Programeaza vizionare"

### Pagina campanie (`/campanii/[slug]`)
- Versiune rapida, orientata conversie
- Mesaj clar + beneficii + formular scurt
- CTA repetat strategic

### Multumire (`/multumim`)
- Confirmare trimitere formular
- CTA secundar (ex: apel telefonic sau alte unitati)

## 5) Formular lead (flux)

1. Utilizator completeaza nume, telefon, email, interes, mesaj
2. Validare client cu Zod
3. POST in `api/lead`
4. Salvare in baza de date / trimitere in CRM
5. Redirect la `/multumim`
6. Event analytics: `lead_submitted`

## 6) Tracking conversii

Evenimente recomandate:
- `cta_primary_click`
- `view_apartment`
- `open_gallery`
- `view_map`
- `lead_form_start`
- `lead_submitted`

## 7) Standard de design (premium + simplu)

- Spatiere aerisita, vizual curat
- Imagini mari, de calitate
- Un singur CTA principal pe sectiune
- Continut direct, usor de scanat
- Mobile-first, formulare scurte

## 8) Ordine implementare (MVP)

1. Setup proiect + deploy initial
2. Layout global (navbar/footer/stiluri)
3. Landing ansamblu
4. Pagina apartament
5. Formular + endpoint lead
6. Pagina campanie
7. Analytics + optimizari performanta

## 9) Mini-studiu de caz (text de inclus)

"Aceasta pagina este gandita pentru a reduce timpul de raspuns si a creste numarul de lead-uri calificate. Prin formular simplificat, CTA-uri vizibile si structura orientata pe beneficii, utilizatorul ajunge mai rapid la actiune. Designul aerisit si continutul clar cresc increderea, mai ales pe segmentul premium."
