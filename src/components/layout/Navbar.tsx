import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/85 backdrop-blur-xl">
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
  );
}
