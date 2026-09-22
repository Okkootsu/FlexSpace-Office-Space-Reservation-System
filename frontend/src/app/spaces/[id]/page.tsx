import { notFound } from "next/navigation";
import { spacesApi } from "@/features/spaces/api";
import { MapPin, Users, CheckCircle, ShieldCheck, Wifi } from "lucide-react";
import { BookingWidget } from "@/features/bookings/components/BookingWidget";

interface SpaceDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SpaceDetailPage({ params }: SpaceDetailPageProps) {
  const { id } = await params;

  let space = null;
  try {
    space = await spacesApi.getById(id);
  } catch {
    notFound();
  }

  if (!space) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Üst Başlık & Konum */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <MapPin className="w-4 h-4 text-indigo-600" />
          <span>{space.city}, {space.district}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {space.title}
        </h1>
      </div>

      {/* İki Kolonlu Yerleşim */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sol Kolon: Bilgiler & Olanaklar */}
        <div className="lg:col-span-2 space-y-8">
          {/* Mekan Görsel Banner'ı */}
          <div className="h-80 bg-gradient-to-tr from-slate-900 to-indigo-950 rounded-2xl flex items-center justify-center p-6 text-white/50 font-mono text-base tracking-widest uppercase shadow-inner">
            {space.title}
          </div>

          {/* Açıklama */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Mekan Hakkında</h2>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {space.description}
            </p>
          </div>

          {/* Kapasite ve Özellikler */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Özellikler & Kapasite</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <Users className="w-5 h-5 text-indigo-600" />
                <div>
                  <div className="text-xs text-slate-400">Kapasite</div>
                  <div className="text-sm font-semibold text-slate-800">{space.capacity} Kişi</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <Wifi className="w-5 h-5 text-indigo-600" />
                <div>
                  <div className="text-xs text-slate-400">İnternet</div>
                  <div className="text-sm font-semibold text-slate-800">Yüksek Hızlı Fiber</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                <div>
                  <div className="text-xs text-slate-400">Güvenlik</div>
                  <div className="text-sm font-semibold text-slate-800">7/24 Kartlı Giriş</div>
                </div>
              </div>
            </div>
          </div>

          {/* Olanaklar Listesi */}
          {space.amenities && space.amenities.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Sunulan Olanaklar</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {space.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sağ Kolon: Rezervasyon Kartı */}
        <div className="lg:col-span-1">
          <BookingWidget
            spaceId={space.id}
            hourlyPrice={space.hourlyPrice}
            currency={space.currency}
          />
        </div>
      </div>
    </div>
  );
}