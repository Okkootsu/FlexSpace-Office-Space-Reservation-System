"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Users, LayoutGrid, ArrowRight } from "lucide-react";
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
      className="bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-3xl border border-white/20 shadow-2xl shadow-indigo-950/30 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-3 transition-all hover:shadow-indigo-950/40"
    >
      {/* Şehir Seçimi */}
      <div className="flex-1 w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl hover:bg-slate-50/80 transition-all border border-slate-100 hover:border-indigo-100 group">
        {/* <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <MapPin className="w-full h-full text-indigo-600" />
        </div> */}
        <div className="flex-1 text-left">
          <label htmlFor="hero-city-select" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider cursor-pointer">
            Şehir
          </label>
          <select
            id="hero-city-select"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-transparent text-sm font-bold text-slate-800 focus:outline-none cursor-pointer"
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

      <div className="hidden md:block w-px h-10 bg-slate-200/80" />

      {/* Mekan Tipi */}
      <div className="flex-1 w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl hover:bg-slate-50/80 transition-all border border-slate-100 hover:border-indigo-100 group">
        {/* <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <LayoutGrid className="w-full h-full text-violet-600" />
        </div> */}
        <div className="flex-1 text-left">
          <label htmlFor="hero-type-select" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider cursor-pointer">
            Alan Türü
          </label>
          <select
            id="hero-type-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-transparent text-sm font-bold text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="">Tüm Mekanlar</option>
            <option value={SpaceType.HotDesk}>Hot Desk (Serbest Masa)</option>
            <option value={SpaceType.DedicatedDesk}>Sabit Masa</option>
            <option value={SpaceType.MeetingRoom}>Toplantı Odası</option>
            <option value={SpaceType.PrivateOffice}>Özel Ofis</option>
          </select>
        </div>
      </div>

      <div className="hidden md:block w-px h-10 bg-slate-200/80" />

      {/* Kapasite */}
      <div className="flex-1 w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl hover:bg-slate-50/80 transition-all border border-slate-100 hover:border-indigo-100 group">
        {/* <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <Users className="w-full h-full text-cyan-600" />
        </div> */}
        <div className="flex-1 text-left">
          <label htmlFor="hero-capacity-input" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider cursor-pointer">
            Kişi Sayısı
          </label>
          <input
            id="hero-capacity-input"
            type="number"
            min="1"
            placeholder="Min kişi sayısı"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="w-full bg-transparent text-sm font-bold text-slate-800 placeholder:text-slate-400 placeholder:font-normal focus:outline-none cursor-pointer"
          />
        </div>
      </div>

      {/* Arama Butonu */}
      <button
        type="submit"
        className="w-full md:w-auto px-8 py-4 rounded-2xl bg-linear-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg shadow-indigo-600/35 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer"
      >
        <Search className="w-4 h-4 stroke-[2.5]" />
        <span>Mekan Bul</span>
        <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </form>
  );
}