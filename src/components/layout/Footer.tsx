export function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10 bg-zinc-950 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-2 px-6 py-5 text-sm text-white/75 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} Portofoliu Imobiliar</p>
        <p>Dezvoltatori rezidential, premium si luxury</p>
      </div>
    </footer>
  );
}
