# Task Board implementare (Cursor + GitHub + Vercel)

Acest task board este gandit pentru implementare rapida, in pasi mici, cu focus pe calitate vizuala si conversii.

## Ziua 1 - Setup si fundatie

### Obiectiv
Pornesti proiectul, il urci pe GitHub si faci primul deploy pe Vercel.

### Task-uri
- [ ] Initializeaza proiect Next.js + TypeScript + Tailwind
- [ ] Configureaza structura de directoare (`app`, `components`, `lib`)
- [ ] Creeaza layout global (`layout.tsx`) + stiluri de baza
- [ ] Configureaza navbar si footer minimal
- [ ] Initializeaza git + commit initial
- [ ] Creeaza repository pe GitHub + push
- [ ] Conecteaza proiectul in Vercel + deploy initial

### Criteriu de gata
- Aplicatia este live pe Vercel si ruleaza fara erori.

---

## Ziua 2 - Landing page ansamblu

### Obiectiv
Construiesti pagina principala orientata pe impact vizual si lead generation.

### Task-uri
- [ ] Creeaza sectiunea Hero cu randari mari + headline + CTA
- [ ] Creeaza sectiunea "De ce acest proiect?"
- [ ] Adauga sectiunea planuri + facilitati + harta
- [ ] Adauga formular de contact vizibil in pagina
- [ ] Adauga CTA repetat strategic (sus + final pagina)
- [ ] Optimizeaza imaginile cu `next/image`
- [ ] Verifica responsive (mobile, tablet, desktop)

### Criteriu de gata
- Landing page-ul comunica clar proiectul si are formular functional vizibil.

---

## Ziua 3 - Pagina apartament

### Obiectiv
Livrare paginii detaliate pe unitate cu focus pe decizie si programare vizionare.

### Task-uri
- [ ] Creeaza ruta dinamica `apartamente/[slug]`
- [ ] Adauga galerie foto mare (cu lightbox daca doresti)
- [ ] Adauga plan 2D/3D in pagina
- [ ] Afiseaza pret, suprafete, disponibilitate
- [ ] Adauga CTA clar: "Programeaza vizionare"
- [ ] Leaga CTA-ul de formularul de lead
- [ ] Verifica viteza paginii si UX mobil

### Criteriu de gata
- Pagina unui apartament este completa si pregatita pentru conversii.

---

## Ziua 4 - Pagini campanii

### Obiectiv
Creezi structura reutilizabila pentru campanii rapide.

### Task-uri
- [ ] Creeaza ruta dinamica `campanii/[slug]`
- [ ] Definește un template de campanie (hero + beneficii + formular)
- [ ] Adauga varianta copy scurt pentru trafic din ads
- [ ] Simplifica formularul (cat mai putine campuri)
- [ ] Adauga sectiune de incredere (beneficii/probe sociale)
- [ ] Creeaza pagina de multumire (`/multumim`)

### Criteriu de gata
- Poti lansa rapid pagini noi de campanie fara refactor major.

---

## Ziua 5 - Lead pipeline si analytics

### Obiectiv
Asiguri masurare completa a conversiilor si flux clar pentru lead-uri.

### Task-uri
- [x] Configureaza validarea formularului cu Zod
- [x] Creeaza endpoint `api/lead`
- [x] Salveaza lead-urile in Supabase (sau trimite in CRM)
- [x] Configureaza evenimentele cheie in analytics
- [x] Testeaza evenimentele:
  - [x] `cta_primary_click`
  - [ ] `view_apartment`
  - [ ] `open_gallery`
  - [x] `lead_form_start`
  - [x] `lead_submitted`
- [x] Verifica funnel-ul complet: click CTA -> submit -> multumire

### Criteriu de gata
- Formularele trimit date corect, iar conversiile sunt track-uite corect.

---

## Ziua 6 - Polish premium

### Obiectiv
Ridici produsul la nivel premium: performanta, consistenta si detalii de incredere.

### Task-uri
- [ ] Ajusteaza tipografie, spacing si consistenta vizuala
- [ ] Verifica claritatea CTA-urilor pe toate paginile
- [ ] Optimizeaza metadata SEO (title, description, Open Graph)
- [ ] Adauga favicon si branding de baza
- [ ] Ruleaza audit Lighthouse si rezolva punctele majore
- [ ] Test final pe dispozitive diferite

### Criteriu de gata
- Site-ul arata premium, se incarca rapid si este pregatit de prezentare.

---

## Backlog (dupa MVP)

- [ ] CMS pentru editare continut fara cod (Sanity/Strapi)
- [ ] Integrare WhatsApp CTA pentru raspuns rapid
- [ ] Filtrare avansata apartamente (pret, camere, suprafata)
- [ ] Automatizari email pentru lead-uri noi
- [ ] Dashboard simplu pentru status lead-uri

## Mini text de prezentare pentru portofoliu

"Aceasta implementare este gandita pentru a reduce timpul de raspuns si a creste numarul de lead-uri calificate. Structura paginilor este orientata pe claritate, viteza si call-to-action, pentru a transforma traficul in solicitari relevante."
