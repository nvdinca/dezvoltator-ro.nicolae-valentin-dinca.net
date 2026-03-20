"use client";

import { useMemo, useState } from "react";

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
      images: form.imagesText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      plan2d: form.plan2d,
      plan3d: form.plan3d,
    };

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

        <div className="grid gap-3 md:grid-cols-2">
          <input
            placeholder="Slug"
            value={form.slug}
            onChange={(e) => setForm((s) => ({ ...s, slug: e.target.value }))}
            className="rounded-md border border-black/15 px-3 py-2.5 text-sm"
          />
          <input
            placeholder="Titlu"
            value={form.title}
            onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
            className="rounded-md border border-black/15 px-3 py-2.5 text-sm"
          />
          <input
            placeholder="Camere"
            value={form.rooms}
            onChange={(e) => setForm((s) => ({ ...s, rooms: e.target.value }))}
            className="rounded-md border border-black/15 px-3 py-2.5 text-sm"
          />
          <input
            placeholder="Etaj"
            value={form.floor}
            onChange={(e) => setForm((s) => ({ ...s, floor: e.target.value }))}
            className="rounded-md border border-black/15 px-3 py-2.5 text-sm"
          />
          <input
            placeholder="Preț EUR"
            value={form.priceEur}
            onChange={(e) => setForm((s) => ({ ...s, priceEur: e.target.value }))}
            className="rounded-md border border-black/15 px-3 py-2.5 text-sm"
          />
          <select
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
            <option value="vandut">vandut</option>
          </select>
          <input
            placeholder="Suprafață utilă"
            value={form.areaUseful}
            onChange={(e) => setForm((s) => ({ ...s, areaUseful: e.target.value }))}
            className="rounded-md border border-black/15 px-3 py-2.5 text-sm"
          />
          <input
            placeholder="Suprafață construită"
            value={form.areaBuilt}
            onChange={(e) => setForm((s) => ({ ...s, areaBuilt: e.target.value }))}
            className="rounded-md border border-black/15 px-3 py-2.5 text-sm"
          />
          <input
            placeholder="Plan 2D (URL)"
            value={form.plan2d}
            onChange={(e) => setForm((s) => ({ ...s, plan2d: e.target.value }))}
            className="rounded-md border border-black/15 px-3 py-2.5 text-sm md:col-span-2"
          />
          <input
            placeholder="Plan 3D (URL)"
            value={form.plan3d}
            onChange={(e) => setForm((s) => ({ ...s, plan3d: e.target.value }))}
            className="rounded-md border border-black/15 px-3 py-2.5 text-sm md:col-span-2"
          />
          <textarea
            placeholder="Descriere scurtă"
            value={form.shortDescription}
            onChange={(e) => setForm((s) => ({ ...s, shortDescription: e.target.value }))}
            className="rounded-md border border-black/15 px-3 py-2.5 text-sm md:col-span-2"
            rows={3}
          />
          <textarea
            placeholder="Imagini (un URL pe linie)"
            value={form.imagesText}
            onChange={(e) => setForm((s) => ({ ...s, imagesText: e.target.value }))}
            className="rounded-md border border-black/15 px-3 py-2.5 text-sm md:col-span-2"
            rows={4}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={save}
            disabled={loading}
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
