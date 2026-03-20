import { Suspense } from "react";
import { ApartmentShowcase } from "@/components/sections/ApartmentShowcase";
import { CampaignShowcase } from "@/components/sections/CampaignShowcase";
import { ContactStickyForm } from "@/components/sections/ContactStickyForm";
import { HeroProject } from "@/components/sections/HeroProject";
import { PlansFacilitiesMap } from "@/components/sections/PlansFacilitiesMap";
import { WhyProject } from "@/components/sections/WhyProject";
import { getApartmentsFromDb } from "@/lib/data/apartments-db";

export default async function Home() {
  const apartments = await getApartmentsFromDb();

  return (
    <main className="flex flex-1 flex-col">
      <HeroProject />
      <WhyProject />
      <PlansFacilitiesMap />
      <Suspense fallback={null}>
        <ApartmentShowcase apartments={apartments} />
      </Suspense>
      <CampaignShowcase />
      <ContactStickyForm />
    </main>
  );
}
