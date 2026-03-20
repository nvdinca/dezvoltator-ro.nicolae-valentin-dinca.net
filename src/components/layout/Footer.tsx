export function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10 bg-zinc-950 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-3 px-6 py-5 text-sm text-white/75 md:flex-row md:items-center">
        <div>
          <p>© {new Date().getFullYear()} Portofoliu Imobiliar</p>
          <p>Copyright by Nicolae-Valentin Dincă</p>
        </div>

        <div className="space-y-1 md:text-right">
          <p>Dezvoltatori rezidențial, premium și luxury</p>
          <p>
            Vrei un site ca acesta? Contactează-l pe Nicolae-Valentin Dincă pe{" "}
            <a
              href="https://wa.me/40784493923"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline decoration-white/40 underline-offset-2"
            >
              WhatsApp
            </a>
            : +40 784 493 923
          </p>
        </div>
      </div>
    </footer>
  );
}
