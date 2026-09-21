"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SpaceType } from "../types";
import { Filter, X } from "lucide-react";

export function SpaceFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCity = searchParams.get("city") || "";
  const selectedType = searchParams.get("type") || "";

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push(pathname);
  };

  const hasActiveFilters = Boolean(selectedCity || selectedType);

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 w-full md:w-auto">
          <Filter className="w-4 h-4 text-indigo-600" />
          <span>Filtrele</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={selectedCity}
            onChange={(e) => updateFilters("city", e.target.value)}
            aria-label="Şehir Seçin"
            className="text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Tüm Şehirler</option>
            <option value="İstanbul">İstanbul</option>
            <option value="Ankara">Ankara</option>
            <option value="İzmir">İzmir</option>
            <option value="Kocaeli">Kocaeli</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => updateFilters("type", e.target.value)}
            aria-label="Mekan Tipi Seçin"
            className="text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Tüm Mekan Tipleri</option>
            <option value={SpaceType.HotDesk}>Hot Desk</option>
            <option value={SpaceType.DedicatedDesk}>Sabit Masa</option>
            <option value={SpaceType.MeetingRoom}>Toplantı Odası</option>
            <option value={SpaceType.PrivateOffice}>Özel Ofis</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-red-600 transition px-2 py-2"
            >
              <X className="w-3.5 h-3.5" />
              Temizle
            </button>
          )}
        </div>
      </div>
    </div>
  );
}