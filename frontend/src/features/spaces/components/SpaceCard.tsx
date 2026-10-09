import Link from "next/link";
import { Users, MapPin, CheckCircle2, ArrowUpRight, Sparkles } from "lucide-react";
import { Space, SpaceType } from "../types";

const SpaceTypeBadge: Record<SpaceType, { label: string; color: string; dotColor: string }> = {
  [SpaceType.HotDesk]: {
    label: "Hot Desk",
    color: "bg-emerald-500/10 text-emerald-700 border-emerald-300/60",
    dotColor: "bg-emerald-500",
  },
  [SpaceType.DedicatedDesk]: {
    label: "Sabit Masa",
    color: "bg-blue-500/10 text-blue-700 border-blue-300/60",
    dotColor: "bg-blue-500",
  },
  [SpaceType.MeetingRoom]: {
    label: "Toplantı Odası",
    color: "bg-purple-500/10 text-purple-700 border-purple-300/60",
    dotColor: "bg-purple-500",
  },
  [SpaceType.PrivateOffice]: {
    label: "Özel Ofis",
    color: "bg-amber-500/10 text-amber-700 border-amber-300/60",
    dotColor: "bg-amber-500",
  },
};

interface SpaceCardProps {
  space: Space;
}

export function SpaceCard({ space }: SpaceCardProps) {
  const badge = SpaceTypeBadge[space.type] || {
    label: "Çalışma Alanı",
    color: "bg-slate-500/10 text-slate-700 border-slate-300/60",
    dotColor: "bg-slate-500",
  };

  return (
    <Link
      href={`/spaces/${space.id}`}
      className="group flex flex-col bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-300 transition-all duration-300 hover:-translate-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      {/* Üst Görsel / Placeholder Banner */}
      <div className="relative h-52 bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-6 overflow-hidden">
        {/* Ambient Gradient glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-all duration-500" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-violet-500/20 rounded-full blur-2xl group-hover:bg-violet-500/30 transition-all duration-500" />

        {/* Space Title Display inside Banner */}
        <div className="relative z-10 text-center px-4 transition-transform duration-300 group-hover:scale-105">
          <span className="text-white/60 font-mono text-xs tracking-widest uppercase font-semibold block mb-1">
            FlexSpace • Alan No #{space.id.slice(0, 4)}
          </span>
          <span className="text-white font-bold text-lg line-clamp-1">
            {space.title}
          </span>
        </div>

        {/* Space Type Badge */}
        <div className="absolute top-3.5 left-3.5 z-20">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md border ${badge.color} shadow-xs`}>
            <span className={`w-1.5 h-1.5 rounded-full ${badge.dotColor}`} />
            {badge.label}
          </span>
        </div>

        {/* Fast Booking indicator */}
        {/* <div className="absolute top-3.5 right-3.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/90 text-indigo-700 shadow-sm">
            <Sparkles className="w-3 h-3 text-indigo-600" />
            Hızlı Kirala
          </span>
        </div> */}
      </div>

      {/* Kart Gövdesi */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Konum */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-2">
            <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span>{space.city}, {space.district}</span>
          </div>

          {/* Başlık */}
          <h3 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors line-clamp-1">
            {space.title}
          </h3>

          {/* Açıklama */}
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
            {space.description}
          </p>

          {/* Olanaklar (Amenities) */}
          {space.amenities && space.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3.5">
              {space.amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 text-[11px] bg-slate-50 border border-slate-200/80 text-slate-600 px-2 py-0.5 rounded-lg"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span>{amenity}</span>
                </span>
              ))}
              {space.amenities.length > 3 && (
                <span className="text-[11px] text-slate-400 font-medium self-center pl-1">
                  +{space.amenities.length - 3} daha
                </span>
              )}
            </div>
          )}
        </div>

        {/* Alt Kısım: Kapasite, Fiyat ve Eylem */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-600 text-xs font-medium bg-slate-50 px-2.5 py-1.5 rounded-lg">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>{space.capacity} Kişi</span>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-400 font-medium block">Saatlik</span>
            <div className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
              {space.hourlyPrice} <span className="text-xs font-semibold text-slate-500">{space.currency}</span>
            </div>
          </div>
        </div>

        {/* Aksiyon Şeridi */}
        <div className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200">
          <span>İncele ve Rezerve Et</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}