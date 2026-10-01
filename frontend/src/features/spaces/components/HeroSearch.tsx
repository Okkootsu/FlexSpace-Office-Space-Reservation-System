"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Users, LayoutGrid } from "lucide-react";
import { SpaceType } from "../types";

export function HeroSearch() {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [type, setType] = useState<string>("");
  const [capacity, setCapacity] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (city) params.append("city", city);
    if (type) params.append("type", type);
    if (capacity) params.append("minCapacity", capacity);

    const queryString = params.toString();
    router.push(`/spaces${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white p-3 sm:p-4 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-3"
    >
      {/* Şehir Seçimi */}
      <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 rounded-2xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
        <MapPin className="w-5 h-5 text-indigo-600 shrink-0" />
        <div className="flex-1 text-left">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Şehir
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="">Tüm Şehirler</option>
            <option value="İstanbul">İstanbul</option>
            <option value="Ankara">Ankara</option>
            <option value="İzmir">İzmir</option>
            <option value="Kocaeli">Kocaeli</option>
          </select>
        </div>
      </div>

      <div className="hidden md:block w-px h-8 bg-slate-200" />

      {/* Mekan Tipi */}
      <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 rounded-2xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
        <LayoutGrid className="w-5 h-5 text-indigo-600 shrink-0" />
        <div className="flex-1 text-left">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Alan Türü
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="">Tüm Mekanlar</option>
            <option value={SpaceType.HotDesk}>Hot Desk</option>
            <option value={SpaceType.DedicatedDesk}>Sabit Masa</option>
            <option value={SpaceType.MeetingRoom}>Toplantı Odası</option>
            <option value={SpaceType.PrivateOffice}>Özel Ofis</option>
          </select>
        </div>
      </div>

      <div className="hidden md:block w-px h-8 bg-slate-200" />

      {/* Kapasite */}
      <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 rounded-2xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
        <Users className="w-5 h-5 text-indigo-600 shrink-0" />
        <div className="flex-1 text-left">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Kişi Sayısı
          </label>
          <input
            type="number"
            min="1"
            placeholder="Min kişi sayısı"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-normal focus:outline-none"
          />
        </div>
      </div>

      {/* Arama Butonu */}
      <button
        type="submit"
        className="w-full md:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 shrink-0"
      >
        <Search className="w-4 h-4" />
        <span>Mekan Bul</span>
      </button>
    </form>
  );
}