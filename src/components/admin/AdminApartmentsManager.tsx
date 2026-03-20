"use client";

import { useMemo, useState, type ReactNode } from "react";
import { apartmentSchema } from "@/lib/validations/apartment";

type ApartmentRecord = {
  id: string;
  slug: string;
  title: string;
  rooms: number;
  floor: number;
  price_eur: number;
  area_useful: number;
  area_built: number;
  availability: "disponibil" | "rezervat" | "vandut";
  short_description: string;
  images: string[];
  plan_2d: string;
  plan_3d: string;
};

type ApartmentFormState = {
  slug: string;
  title: string;
  rooms: string;
  floor: string;
  priceEur: string;
  areaUseful: string;
  areaBuilt: string;
  availability: "disponibil" | "rezervat" | "vandut";
  shortDescription: string;
  imagesText: string;
  plan2d: string;
  plan3d: string;
};

function FormField({
  label,
  htmlFor,
  required,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  /** Implicit: obligatoriu (afișează *). Pune `false` pentru câmpuri opționale. */
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  const isRequired = required !== false;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={htmlFor} className="text-sm font-medium text-black/85">
        {label}
        {isRequired ? (
          <span className="ml-0.5 text-rose-600" title="Obligatoriu">
            *
          </span>
        ) : (
          <span className="ml-1 text-xs font-normal text-black/45">(opțional)</span>
        )}
      </label>
      {children}
      {hint ? <p className="text-xs leading-snug text-black/55">{hint}</p> : null}
    </div>
  );
}

const initialForm: ApartmentFormState = {
  slug: "",
  title: "",
  rooms: "2",
  floor: "0",
  priceEur: "",
  areaUseful: "",
  areaBuilt: "",
  availability: "disponibil",
  shortDescription: "",
  imagesText: "",
  plan2d: "",
  plan3d: "",
};

export function AdminApartmentsManager() {
  const [items, setItems] = useState<ApartmentRecord[]>([]);
  const [form, setForm] = useState<ApartmentFormState>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [draggedImageIndex, setDraggedImageIndex] = useState<number | null>(null);

  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (a.availability === b.availability) return a.title.localeCompare(b.title);
        return a.availability.localeCompare(b.availability);
      }),
    [items],
  );

  async function loadItems() {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/apartments");
      const data = await response.json();
      if (!response.ok) {
        setMessage(data?.message ?? "Nu am putut încărca apartamentele.");
      } else {
        setItems(data.items ?? []);
      }
    } catch {
      setMessage("Eroare de rețea la încărcare.");
    } finally {
      setLoading(false);
    }
  }

  async function save() {
    setLoading(true);
    setMessage("");

    const images = form.imagesText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const payload = {
      slug: form.slug,
      title: form.title,
      rooms: form.rooms,
      floor: form.floor,
      priceEur: form.priceEur,
      areaUseful: form.areaUseful,
      areaBuilt: form.areaBuilt,
      availability: form.availability,
      shortDescription: form.shortDescription,
      images,
      plan2d: form.plan2d,
      plan3d: form.plan3d,
    };

    const parsed = apartmentSchema.safeParse(payload);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      setMessage(first?.message ?? "Verifică câmpurile marcate cu *.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        editingId ? `/api/admin/apartments/${editingId}` : "/api/admin/apartments",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        setMessage(data?.message ?? "Nu am putut salva apartamentul.");
      } else {
        setMessage(editingId ? "Apartamentul a fost actualizat." : "Apartamentul a fost creat.");
        setForm(initialForm);
        setEditingId(null);
        await loadItems();
      }
    } catch {
      setMessage("Eroare de rețea la salvare.");
    } finally {
      setLoading(false);
    }
  }

  async function seedDemoData() {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/apartments/seed", { method: "POST" });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data?.message ?? "Nu am putut popula datele demo.");
      } else {
        setMessage(data?.message ?? "Datele demo au fost încărcate.");
        await loadItems();
      }
    } catch {
      setMessage("Eroare de rețea la popularea datelor demo.");
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Sigur vrei să ștergi acest apartament?")) return;
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/apartments/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data?.message ?? "Nu am putut șterge apartamentul.");
      } else {
        setMessage("Apartamentul a fost șters.");
        if (editingId === id) {
          setEditingId(null);
          setForm(initialForm);
        }
        await loadItems();
      }
    } catch {
      setMessage("Eroare de rețea la ștergere.");
    } finally {
      setLoading(false);
    }
  }

  function getImageList() {
    return form.imagesText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }

  function setImageList(urls: string[]) {
    setForm((s) => ({ ...s, imagesText: urls.join("\n") }));
  }

  function moveImage(fromIndex: number, toIndex: number) {
    if (fromIndex === toIndex) return;
    const list = getImageList();
    if (fromIndex < 0 || toIndex < 0 || fromIndex >= list.length || toIndex >= list.length) return;

    const [moved] = list.splice(fromIndex, 1);
    list.splice(toIndex, 0, moved);
    setImageList(list);
  }

  function setAsCover(index: number) {
    if (index <= 0) return;
    moveImage(index, 0);
  }

  async function uploadImages(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append("images", file));

      const response = await fetch("/api/admin/apartments/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data?.message ?? "Nu am putut încărca imaginile.");
      } else {
        const merged = [...getImageList(), ...(data.urls ?? [])];
        setImageList(merged);
        setMessage("Imaginile au fost încărcate.");
      }
    } catch {
      setMessage("Eroare de rețea la upload.");
    } finally {
      setUploading(false);
    }
  }

  async function deleteImage(url: string) {
    const current = getImageList();
    setImageList(current.filter((item) => item !== url));

    if (!url.includes("/storage/v1/object/public/")) return;

    try {
      await fetch("/api/admin/apartments/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
    } catch {
      // Ignore storage delete errors; URL already removed from form.
    }
  }

  function edit(item: ApartmentRecord) {
    setEditingId(item.id);
    setForm({
      slug: item.slug,
      title: item.title,
      rooms: String(item.rooms),
      floor: String(item.floor),
      priceEur: String(item.price_eur),
      areaUseful: String(item.area_useful),
      areaBuilt: String(item.area_built),
      availability: item.availability,
      shortDescription: item.short_description,
      imagesText: (item.images ?? []).join("\n"),
      plan2d: item.plan_2d,
      plan3d: item.plan_3d,
    });
  }

  const imageList = getImageList();

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-black/10 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {editingId ? "Editează apartament" : "Adaugă apartament"}
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={seedDemoData}
              className="rounded-md border border-black/15 px-3 py-2 text-sm"
              disabled={loading}
            >
              Încarcă date demo (3)
            </button>
            <button
              type="button"
              onClick={loadItems}
              className="rounded-md border border-black/15 px-3 py-2 text-sm"
              disabled={loading}
            >
              Reîncarcă listă
            </button>
          </div>
        </div>

        <div className="mb-6 rounded-lg border border-amber-200/80 bg-amber-50/80 px-4 py-3 text-sm text-black/80">
          <p className="font-semibold text-black/90">Ce contează ca să salvezi corect</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-black/75">
            <li>
              <strong>Obligatoriu:</strong> toate câmpurile cu * — inclusiv{" "}
              <strong>minim 1 imagine</strong>, <strong>plan 2D și 3D</strong> (URL valid sau
              cale în site, ex. <code className="rounded bg-black/5 px-1">/images/...</code>).
            </li>
            <li>
              <strong>Slug:</strong> unic, fără spații — devine adresa{" "}
              <code className="rounded bg-black/5 px-1">/apartamente/slug-ul-tau</code>.
            </li>
            <li>
              <strong>Imagini:</strong> prima din listă = <strong>cover</strong> (sau folosește
              „Setează ca cover” / drag-and-drop).
            </li>
          </ul>
          <p className="mt-2 text-xs text-black/60">
            După ce apeși „Creează apartament”, apartamentul apare pe site doar dacă toate
            regulile de mai sus sunt îndeplinite (validare înainte de trimitere).
          </p>
        </div>

        <fieldset className="space-y-4 border-0 p-0">
          <legend className="mb-2 text-sm font-semibold uppercase tracking-wide text-black/55">
            1. Identificare
          </legend>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              label="Slug (identificator URL)"
              htmlFor="apt-slug"
              required
              hint="Ex: apartament-d2 — litere mici, cifre, cratimă. Minim 3 caractere."
            >
              <input
                id="apt-slug"
                name="slug"
                autoComplete="off"
                placeholder="ex. apartament-d2"
                value={form.slug}
                onChange={(e) => setForm((s) => ({ ...s, slug: e.target.value }))}
                className="rounded-md border border-black/15 px-3 py-2.5 text-sm"
              />
            </FormField>
            <FormField
              label="Titlu afișat"
              htmlFor="apt-title"
              required
              hint="Numele apartamentului pe listă și pe pagina de detaliu."
            >
              <input
                id="apt-title"
                name="title"
                placeholder="ex. Apartament D2 — vedere parc"
                value={form.title}
                onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                className="rounded-md border border-black/15 px-3 py-2.5 text-sm"
              />
            </FormField>
          </div>
        </fieldset>

        <fieldset className="mt-6 space-y-4 border-0 border-t border-black/10 pt-6">
          <legend className="mb-2 text-sm font-semibold uppercase tracking-wide text-black/55">
            2. Detalii și preț
          </legend>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              label="Număr camere"
              htmlFor="apt-rooms"
              required
              hint="Întreg, 1–10."
            >
              <input
                id="apt-rooms"
                name="rooms"
                inputMode="numeric"
                placeholder="2"
                value={form.rooms}
                onChange={(e) => setForm((s) => ({ ...s, rooms: e.target.value }))}
                className="rounded-md border border-black/15 px-3 py-2.5 text-sm"
              />
            </FormField>
            <FormField
              label="Etaj"
              htmlFor="apt-floor"
              required
              hint="Întreg, 0 = parter."
            >
              <input
                id="apt-floor"
                name="floor"
                inputMode="numeric"
                placeholder="0"
                value={form.floor}
                onChange={(e) => setForm((s) => ({ ...s, floor: e.target.value }))}
                className="rounded-md border border-black/15 px-3 py-2.5 text-sm"
              />
            </FormField>
            <FormField
              label="Preț (EUR)"
              htmlFor="apt-price"
              required
              hint="Număr întreg (fără punct sau virgulă)."
            >
              <input
                id="apt-price"
                name="priceEur"
                inputMode="numeric"
                placeholder="185000"
                value={form.priceEur}
                onChange={(e) => setForm((s) => ({ ...s, priceEur: e.target.value }))}
                className="rounded-md border border-black/15 px-3 py-2.5 text-sm"
              />
            </FormField>
            <FormField label="Disponibilitate" htmlFor="apt-availability" required>
              <select
                id="apt-availability"
                name="availability"
                value={form.availability}
                onChange={(e) =>
                  setForm((s) => ({
                    ...s,
                    availability: e.target.value as ApartmentFormState["availability"],
                  }))
                }
                className="rounded-md border border-black/15 px-3 py-2.5 text-sm"
              >
                <option value="disponibil">disponibil</option>
                <option value="rezervat">rezervat</option>
                <option value="vandut">vândut</option>
              </select>
            </FormField>
            <FormField
              label="Suprafață utilă (m²)"
              htmlFor="apt-area-useful"
              required
              hint="Număr pozitiv (ex: 72.5)."
            >
              <input
                id="apt-area-useful"
                name="areaUseful"
                inputMode="decimal"
                placeholder="72.5"
                value={form.areaUseful}
                onChange={(e) => setForm((s) => ({ ...s, areaUseful: e.target.value }))}
                className="rounded-md border border-black/15 px-3 py-2.5 text-sm"
              />
            </FormField>
            <FormField
              label="Suprafață construită (m²)"
              htmlFor="apt-area-built"
              required
              hint="Număr pozitiv."
            >
              <input
                id="apt-area-built"
                name="areaBuilt"
                inputMode="decimal"
                placeholder="95"
                value={form.areaBuilt}
                onChange={(e) => setForm((s) => ({ ...s, areaBuilt: e.target.value }))}
                className="rounded-md border border-black/15 px-3 py-2.5 text-sm"
              />
            </FormField>
          </div>
        </fieldset>

        <fieldset className="mt-6 space-y-4 border-0 border-t border-black/10 pt-6">
          <legend className="mb-2 text-sm font-semibold uppercase tracking-wide text-black/55">
            3. Galerie foto
          </legend>
          <FormField
            label="Lista de imagini (URL-uri)"
            htmlFor="apt-images"
            required
            hint="Un URL pe linie. Poți lipi linkuri sau folosi upload-ul de mai jos — se adaugă automat aici. Minim 1 URL."
          >
            <textarea
              id="apt-images"
              name="images"
              placeholder={"https://...\nhttps://..."}
              value={form.imagesText}
              onChange={(e) => setForm((s) => ({ ...s, imagesText: e.target.value }))}
              className="rounded-md border border-black/15 px-3 py-2.5 text-sm"
              rows={4}
            />
          </FormField>
          <div className="rounded-md border border-black/15 bg-zinc-50 p-4">
            <FormField
              label="Încarcă imagini de pe calculator"
              htmlFor="apt-upload"
              required={false}
              hint="Opțional dacă ai deja URL-uri mai sus. JPG, PNG, WebP — max. 8MB/fișier."
            >
              <input
                id="apt-upload"
                name="upload"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={(event) => uploadImages(event.target.files)}
                className="block w-full text-sm text-black/75 file:mr-3 file:rounded-md file:border file:border-black/15 file:bg-white file:px-3 file:py-2 file:text-sm"
                disabled={uploading}
              />
            </FormField>
          </div>
        </fieldset>

        <fieldset className="mt-6 space-y-4 border-0 border-t border-black/10 pt-6">
          <legend className="mb-2 text-sm font-semibold uppercase tracking-wide text-black/55">
            4. Planuri
          </legend>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              label="Plan 2D"
              htmlFor="apt-plan-2d"
              required
              hint="URL complet sau cale în public, ex. /images/plan-2d.webp"
            >
              <input
                id="apt-plan-2d"
                name="plan2d"
                placeholder="https://... sau /images/..."
                value={form.plan2d}
                onChange={(e) => setForm((s) => ({ ...s, plan2d: e.target.value }))}
                className="rounded-md border border-black/15 px-3 py-2.5 text-sm"
              />
            </FormField>
            <FormField
              label="Plan 3D / randare"
              htmlFor="apt-plan-3d"
              required
              hint="La fel ca planul 2D — obligatoriu pentru afișare corectă."
            >
              <input
                id="apt-plan-3d"
                name="plan3d"
                placeholder="https://... sau /images/..."
                value={form.plan3d}
                onChange={(e) => setForm((s) => ({ ...s, plan3d: e.target.value }))}
                className="rounded-md border border-black/15 px-3 py-2.5 text-sm"
              />
            </FormField>
          </div>
        </fieldset>

        <fieldset className="mt-6 space-y-4 border-0 border-t border-black/10 pt-6">
          <legend className="mb-2 text-sm font-semibold uppercase tracking-wide text-black/55">
            5. Descriere
          </legend>
          <FormField
            label="Descriere scurtă"
            htmlFor="apt-description"
            required
            hint="Minim 8 caractere, maxim ~300 — rezumat pentru carduri și SEO."
          >
            <textarea
              id="apt-description"
              name="shortDescription"
              placeholder="2–3 propoziții despre apartament..."
              value={form.shortDescription}
              onChange={(e) => setForm((s) => ({ ...s, shortDescription: e.target.value }))}
              className="rounded-md border border-black/15 px-3 py-2.5 text-sm"
              rows={3}
            />
          </FormField>
        </fieldset>

        {imageList.length > 0 ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {imageList.map((url, index) => (
              <div
                key={url}
                className="overflow-hidden rounded-lg border border-black/10 bg-white"
                draggable
                onDragStart={() => setDraggedImageIndex(index)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => {
                  if (draggedImageIndex === null) return;
                  moveImage(draggedImageIndex, index);
                  setDraggedImageIndex(null);
                }}
                onDragEnd={() => setDraggedImageIndex(null)}
              >
                <div className="aspect-video bg-zinc-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt="Preview apartament"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 p-2">
                  <div className="min-w-0">
                    {index === 0 ? (
                      <p className="mb-1 inline-block rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                        Cover
                      </p>
                    ) : null}
                    <p className="truncate text-xs text-black/60">{url}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-stretch gap-1.5 sm:flex-row sm:items-center">
                    {index === 0 ? (
                      <span
                        className="whitespace-nowrap rounded-md border border-emerald-200 bg-emerald-50/80 px-2 py-1 text-center text-[10px] font-medium text-emerald-800"
                        title="Prima imagine din listă este cover-ul"
                      >
                        Cover actual
                      </span>
                    ) : (
                      <button
                        type="button"
                        draggable={false}
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          setAsCover(index);
                        }}
                        className="whitespace-nowrap rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-800 hover:bg-emerald-100"
                      >
                        Setează ca cover
                      </button>
                    )}
                    <button
                      type="button"
                      draggable={false}
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteImage(url);
                      }}
                      className="rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs text-rose-700"
                    >
                      Șterge
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
        {imageList.length > 1 ? (
          <p className="mt-2 text-xs text-black/55">
            Trage și lasă imaginile pentru reordonare. Prima imagine este folosită ca cover.
          </p>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={save}
            disabled={loading || uploading}
            className="rounded-md bg-black px-4 py-2.5 text-sm font-semibold text-white"
          >
            {editingId ? "Salvează modificări" : "Creează apartament"}
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(initialForm);
              }}
              className="rounded-md border border-black/15 px-4 py-2.5 text-sm"
            >
              Renunță la editare
            </button>
          ) : null}
          {message ? <p className="text-sm text-black/70">{message}</p> : null}
        </div>
      </div>

      <div className="rounded-xl border border-black/10 bg-white p-5">
        <h2 className="mb-4 text-xl font-semibold">Apartamente existente</h2>
        {sortedItems.length === 0 ? (
          <p className="text-sm text-black/65">
            Nu există apartamente încă. Apasă „Reîncarcă listă”.
          </p>
        ) : (
          <div className="space-y-3">
            {sortedItems.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-2 rounded-lg border border-black/10 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-black/65">
                    {item.slug} • {item.rooms} camere • {item.price_eur} EUR •{" "}
                    {item.availability}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => edit(item)}
                    className="rounded-md border border-black/15 px-3 py-2 text-sm"
                  >
                    Editează
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
                  >
                    Șterge
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
