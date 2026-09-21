import Link from "next/link";
import { Users, MapPin, CheckCircle2 } from "lucide-react";
import { Space, SpaceType } from "../types";

const SpaceTypeBadge: Record<SpaceType, { label: string; color: string }> = {
  [SpaceType.HotDesk]: { label: "Hot Desk", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  [SpaceType.DedicatedDesk]: { label: "Sabit Masa", color: "bg-blue-50 text-blue-700 border-blue-200" },
  [SpaceType.MeetingRoom]: { label: "Toplantı Odası", color: "bg-purple-50 text-purple-700 border-purple-200" },
  [SpaceType.PrivateOffice]: { label: "Özel Ofis", color: "bg-amber-50 text-amber-700 border-amber-200" },
};

interface SpaceCardProps {
  space: Space;
}

export function SpaceCard({ space }: SpaceCardProps) {
  const badge = SpaceTypeBadge[space.type] || {
    label: "Çalışma Alanı",
    color: "bg-slate-50 text-slate-700 border-slate-200",
  };

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      {/* Üst Görsel / Placeholder */}
      <div className="relative h-48 bg-gradient-to-tr from-slate-800 to-indigo-900 flex items-center justify-center p-4">
        <span className="text-white/40 font-mono text-sm tracking-wider uppercase">
          {space.title}
        </span>
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badge.color}`}>
            {badge.label}
          </span>
        </div>
      </div>

      {/* Kart Gövdesi */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{space.city}, {space.district}</span>
          </div>

          <h3 className="font-semibold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors line-clamp-1">
            {space.title}
          </h3>
          <p className="text-sm text-slate-600 mt-1 line-clamp-2">
            {space.description}
          </p>

          {/* Olanaklar (Amenities) */}
          {space.amenities && space.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {space.amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  {amenity}
                </span>
              ))}
              {space.amenities.length > 3 && (
                <span className="text-[11px] text-slate-400 self-center">
                  +{space.amenities.length - 3} daha
                </span>
              )}
            </div>
          )}
        </div>

        {/* Alt Kısım: Kapasite, Fiyat ve Buton */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1 text-slate-500 text-xs">
            <Users className="w-4 h-4 text-slate-400" />
            <span>{space.capacity} Kişilik</span>
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-400">Saatlik</div>
            <div className="text-base font-bold text-slate-900">
              {space.hourlyPrice} {space.currency}
            </div>
          </div>
        </div>

        <Link
          href={`/spaces/${space.id}`}
          className="mt-4 block w-full text-center py-2 px-4 rounded-xl text-sm font-medium bg-slate-100 text-slate-800 group-hover:bg-indigo-600 group-hover:text-white transition-colors"
        >
          İncele ve Rezerve Et
        </Link>
      </div>
    </div>
  );
}