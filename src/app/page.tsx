import { ContactStickyForm } from "@/components/sections/ContactStickyForm";
import { HeroProject } from "@/components/sections/HeroProject";
import { PlansFacilitiesMap } from "@/components/sections/PlansFacilitiesMap";
import { WhyProject } from "@/components/sections/WhyProject";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroProject />
      <WhyProject />
      <PlansFacilitiesMap />
      <ContactStickyForm />
    </main>
  );
}
