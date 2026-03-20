import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";

export function ContactStickyForm() {
  return (
    <section id="contact" className="bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-18 md:grid-cols-[1.08fr_1fr] md:py-24">
        <div className="space-y-5">
          <p className="text-xs font-semibold tracking-[0.2em] text-black/45 uppercase">
            Conversie rapida
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-black md:text-5xl">
            Solicita oferta personalizata
          </h2>
          <p className="max-w-xl text-base leading-8 text-black/70 md:text-lg">
            Formular simplu, gandit pentru raspuns rapid din partea echipei de
            vanzari. Scopul este reducerea timpului de contact si cresterea
            lead-urilor calificate.
          </p>
          <p className="inline-flex rounded-full border border-black/15 bg-zinc-50 px-3 py-1 text-sm text-black/60">
            Timp estimat de raspuns: sub 24h
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-zinc-50 p-7 shadow-sm">
          <LeadCaptureForm source="landing-home" buttonLabel="Trimite solicitarea" />
        </div>
      </div>
    </section>
  );
}
