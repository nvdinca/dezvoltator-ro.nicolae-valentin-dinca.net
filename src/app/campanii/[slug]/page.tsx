import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { campaigns, getCampaignBySlug } from "@/lib/data/campaigns";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return campaigns.map((campaign) => ({ slug: campaign.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const campaign = getCampaignBySlug(slug);

  if (!campaign) {
    return {
      title: "Campanie inexistenta",
    };
  }

  return {
    title: `${campaign.title} - Campanie`,
    description: campaign.subtitle,
  };
}

export default async function CampaignPage({ params }: PageProps) {
  const { slug } = await params;
  const campaign = getCampaignBySlug(slug);

  if (!campaign) {
    notFound();
  }

  return (
    <main className="flex-1 bg-zinc-50">
      <div className="mx-auto w-full max-w-5xl px-6 py-10 md:py-14">
        <Link
          href="/"
          className="text-sm font-medium text-black/65 transition hover:text-black"
        >
          ← Inapoi la homepage
        </Link>

        <section className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
          <div className="relative h-64 md:h-80">
            <Image
              src={campaign.heroImage}
              alt={campaign.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-black/20" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                {campaign.offerLabel}
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                {campaign.title}
              </h1>
            </div>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
            <div>
              <p className="text-base leading-8 text-black/75 md:text-lg">
                {campaign.subtitle}
              </p>

              <h2 className="mt-7 text-xl font-semibold">De ce functioneaza</h2>
              <ul className="mt-4 space-y-3">
                {campaign.bullets.map((point) => (
                  <li
                    key={point}
                    className="rounded-lg border border-black/10 bg-zinc-50 px-4 py-3 text-sm text-black/75 md:text-base"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="rounded-xl border border-black/10 bg-zinc-50 p-5">
              <h3 className="text-lg font-semibold">Solicita detalii</h3>
              <p className="mt-2 text-sm leading-6 text-black/70">
                Formular simplu pentru conversii rapide si lead-uri relevante.
              </p>
              <div className="mt-4">
                <LeadCaptureForm
                  source={`campanie-${campaign.slug}`}
                  buttonLabel={campaign.ctaText}
                  compact
                />
              </div>
              <ul className="mt-5 space-y-2">
                {campaign.trustPoints.map((point) => (
                  <li key={point} className="text-sm text-black/65">
                    • {point}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
