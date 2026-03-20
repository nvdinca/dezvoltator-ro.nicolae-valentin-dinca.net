import Image from "next/image";
import type { Apartment } from "@/lib/data/apartments";

export function ApartmentGallery({ apartment }: { apartment: Apartment }) {
  const [cover, ...rest] = apartment.images;

  return (
    <section className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm md:p-5">
      <div className="relative h-72 overflow-hidden rounded-xl md:h-96">
        <Image
          src={cover}
          alt={`${apartment.title} - imagine principala`}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
        {rest.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="relative h-32 overflow-hidden rounded-lg md:h-36"
          >
            <Image
              src={image}
              alt={`${apartment.title} - galerie ${index + 2}`}
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
