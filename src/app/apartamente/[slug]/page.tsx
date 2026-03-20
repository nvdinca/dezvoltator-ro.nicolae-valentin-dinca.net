import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApartmentDetails } from "@/components/sections/ApartmentDetails";
import { ApartmentGallery } from "@/components/sections/ApartmentGallery";
import { apartments, getApartmentBySlug } from "@/lib/data/apartments";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return apartments.map((apartment) => ({ slug: apartment.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const apartment = getApartmentBySlug(slug);

  if (!apartment) {
    return {
      title: "Apartament inexistent",
    };
  }

  return {
    title: `${apartment.title} - Nicolae-Valentin Dinca`,
    description: apartment.shortDescription,
  };
}

export default async function ApartmentPage({ params }: PageProps) {
  const { slug } = await params;
  const apartment = getApartmentBySlug(slug);

  if (!apartment) {
    notFound();
  }

  return (
    <main className="flex-1 bg-zinc-50">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 md:py-14">
        <Link
          href="/"
          className="text-sm font-medium text-black/65 transition hover:text-black"
        >
          ← Inapoi la proiect
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <ApartmentGallery apartment={apartment} />
          <ApartmentDetails apartment={apartment} />
        </div>

        <section className="mt-6 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Plan 2D</h2>
            <div className="relative mt-4 h-60 overflow-hidden rounded-lg">
              <Image
                src={apartment.plan2d}
                alt={`${apartment.title} plan 2D`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </article>

          <article className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Plan 3D</h2>
            <div className="relative mt-4 h-60 overflow-hidden rounded-lg">
              <Image
                src={apartment.plan3d}
                alt={`${apartment.title} plan 3D`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
