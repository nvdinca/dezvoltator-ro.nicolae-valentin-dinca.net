export type Campaign = {
  slug: string;
  title: string;
  subtitle: string;
  offerLabel: string;
  ctaText: string;
  heroImage: string;
  bullets: string[];
  trustPoints: string[];
};

export const campaigns: Campaign[] = [
  {
    slug: "lansare-faza-2",
    title: "Lansare Faza 2 - Unitati noi disponibile",
    subtitle:
      "Campanie orientata pe conversie rapida pentru lead-uri calificate in primele 30 de zile.",
    offerLabel: "Pret promotional la rezervare anticipata",
    ctaText: "Solicita oferta Faza 2",
    heroImage: "/images/hero/hero-02.webp",
    bullets: [
      "Formular scurt, cu campuri esentiale",
      "Mesaj clar orientat pe beneficii",
      "CTA repetat strategic in pagina",
    ],
    trustPoints: [
      "Raspuns in sub 24h",
      "Consultanta gratuita pentru alegerea unitatii",
      "Proces simplu de rezervare",
    ],
  },
  {
    slug: "ultimele-unitati-premium",
    title: "Ultimele unitati premium disponibile",
    subtitle:
      "Landing page dedicat pentru stoc limitat, cu accent pe urgenta si claritate in oferta.",
    offerLabel: "Stoc limitat - 6 unitati ramase",
    ctaText: "Programeaza vizionare premium",
    heroImage: "/images/hero/hero-04.webp",
    bullets: [
      "Headline puternic pentru trafic din Ads",
      "Detalii esentiale fara informatie inutila",
      "Traseu direct catre formular",
    ],
    trustPoints: [
      "Finisaje premium",
      "Locatie excelenta",
      "Asistenta dedicata in procesul de achizitie",
    ],
  },
];

export function getCampaignBySlug(slug: string) {
  return campaigns.find((campaign) => campaign.slug === slug);
}
