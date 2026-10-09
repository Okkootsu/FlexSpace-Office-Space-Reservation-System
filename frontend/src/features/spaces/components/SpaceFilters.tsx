"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SpaceType } from "../types";
import { Filter, X, MapPin, SlidersHorizontal, Check } from "lucide-react";

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

  const typeOptions = [
    { label: "Tüm Tipler", value: "" },
    { label: "Hot Desk", value: String(SpaceType.HotDesk) },
    { label: "Sabit Masa", value: String(SpaceType.DedicatedDesk) },
    { label: "Toplantı Odası", value: String(SpaceType.MeetingRoom) },
    { label: "Özel Ofis", value: String(SpaceType.PrivateOffice) },
  ];

  return (
    <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm mb-8 space-y-4">
      {/* Üst Satır: Hızlı Tip Butonları (Pill Buttons) */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
          <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
          <span>Filtreler</span>
        </div>

        {/* Alan Türü Hızlı Çipler (Interactive Chips) */}
        <div className="flex flex-wrap items-center gap-2">
          {typeOptions.map((opt) => {
            const isSelected = selectedType === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateFilters("type", opt.value)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/25"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Alt Satır: Şehir Dropdown & Temizle */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Şehir Seçici */}
          <div className="relative flex-1 sm:w-64">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedCity}
              onChange={(e) => updateFilters("city", e.target.value)}
              aria-label="Şehir Filtresi"
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-8 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer appearance-none"
            >
              <option value="">Tüm Şehirler</option>
              <option value="İstanbul">İstanbul</option>
              <option value="Ankara">Ankara</option>
              <option value="İzmir">İzmir</option>
              <option value="Kocaeli">Kocaeli</option>
              <option value="Bursa">Bursa</option>
              <option value="Antalya">Antalya</option>
            </select>
          </div>
        </div>

        {/* Aktif Filtre Durumu & Temizleme Butonu */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Aktif filtreler devrede</span>
            <button
              onClick={clearFilters}
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl transition cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Filtreleri Temizle</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}