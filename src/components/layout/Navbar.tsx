import Link from "next/link";

export function Navbar() {
  return (
    <div className="sticky top-0 z-40">
      <div className="border-b border-black/10 bg-zinc-950 px-4 py-2 text-center text-xs text-white/85">
        Acesta este un proiect fictiv de portofoliu pentru dezvoltator imobiliar.
        Nu implică tranzacții reale sau date personale. — Portofoliul lui
        Nicolae-Valentin Dinca:{" "}
        <a
          href="https://nicolae-valentin-dinca.net/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-white underline decoration-white/40 underline-offset-2"
        >
          nicolae-valentin-dinca.net
        </a>
      </div>
      <header className="border-b border-black/10 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <Link href="/" className="text-sm font-semibold tracking-[0.15em] uppercase">
            NVD Portfolio
          </Link>
          <nav
            className="hidden items-center gap-7 text-sm text-black/70 md:flex"
            aria-label="Navigație principală"
          >
            <a href="#proiect">Proiect</a>
            <a href="#apartamente">Apartamente</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>
    </div>
  );
}
