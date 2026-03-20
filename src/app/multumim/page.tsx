import Link from "next/link";

export default function MultumimPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <p className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
        Solicitare trimisă
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">Mulțumim!</h1>
      <p className="mt-3 max-w-xl text-black/70">
        Am primit datele tale. Te contactăm în cel mai scurt timp pentru detalii
        despre apartament sau campanie.
      </p>
      <Link
        href="/"
        className="mt-7 rounded-md bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
      >
        Înapoi la homepage
      </Link>
    </main>
  );
}
