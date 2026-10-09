import { notFound } from "next/navigation";
import Link from "next/link";
import { spacesApi } from "@/features/spaces/api";
import {
  MapPin,
  Users,
  CheckCircle,
  ShieldCheck,
  Wifi,
  ArrowLeft,
  Coffee,
  Sparkles,
  Share2,
} from "lucide-react";
import { BookingWidget } from "@/features/bookings/components/BookingWidget";
import { SpaceType } from "@/features/spaces/types";

interface SpaceDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const typeLabelMap: Record<SpaceType, string> = {
  [SpaceType.HotDesk]: "Hot Desk (Serbest Masa)",
  [SpaceType.DedicatedDesk]: "Sabit Masa",
  [SpaceType.MeetingRoom]: "Toplantı Odası",
  [SpaceType.PrivateOffice]: "Özel Ofis",
};

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-32 md:pb-40">
      {/* Üst Navigasyon & Geri Dönüş Butonu */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <Link
          href="/spaces"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:border-indigo-200 hover:bg-slate-50 transition-all shadow-xs cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Tüm Mekanlara Dön</span>
        </Link>

        {/* Şehir Filtresi Kısayolu ve Tip Rozeti */}
        <div className="flex items-center gap-2">
          <Link
            href={`/spaces?city=${encodeURIComponent(space.city)}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 hover:border-indigo-200 transition cursor-pointer"
            title={`${space.city} şehrindeki tüm mekanları listele`}
          >
            <MapPin className="w-3.5 h-3.5 text-indigo-600" />
            <span>{space.city} Mekanları</span>
          </Link>

          <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
            {typeLabelMap[space.type] || "Çalışma Alanı"}
          </span>
        </div>
      </div>

      {/* Başlık & Konum Bilgisi */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>{space.city}, {space.district}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {space.title}
        </h1>
      </div>

      {/* İki Kolonlu Yerleşim */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
        {/* Sol Kolon: Bilgiler & Olanaklar */}
        <div className="lg:col-span-2 space-y-8 pb-16 sm:pb-24">
          {/* Mekan Görsel Banner'ı / Galeri Önizleme */}
          <div className="relative h-76 sm:h-96 bg-linear-to-tr from-slate-950 via-indigo-950 to-slate-900 rounded-3xl flex flex-col items-center justify-center p-8 text-center overflow-hidden shadow-xl border border-indigo-950/50">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-2">
              {/* <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Doğrulanmış FlexSpace Alanı
              </span> */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {space.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                {space.district}, {space.city}
              </p>
            </div>

            <div className="absolute bottom-4 right-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white/80 text-xs font-medium">
                Önizleme Görseli
              </span>
            </div>
          </div>

          {/* Mekan Hakkında Açıklama */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span>Mekan Hakkında</span>
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {space.description}
            </p>
          </div>

          {/* Kapasite ve Temel Özellikler */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              Özellikler & Kapasite
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3.5 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-indigo-200 transition-colors">
                <div className="w-10 h-full rounded-xl bg-indigo-100/70 text-indigo-600 flex items-center justify-center shrink-0">
                  <Users size={22} className="w-[22px] h-[22px] text-indigo-600 shrink-0" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Kapasite</div>
                  <div className="text-sm font-bold text-slate-900">{space.capacity} Kişi</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-indigo-200 transition-colors">
                <div className="w-10 h-full rounded-xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0">
                  <Wifi size={22} className="w-[22px] h-[22px] text-emerald-600 shrink-0" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">İnternet</div>
                  <div className="text-sm font-bold text-slate-900">Yüksek Hızlı Fiber</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-indigo-200 transition-colors">
                <div className="w-10 h-full rounded-xl bg-violet-100/70 text-violet-600 flex items-center justify-center shrink-0">
                  <ShieldCheck size={22} className="w-[22px] h-[22px] text-violet-600 shrink-0" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Güvenlik</div>
                  <div className="text-sm font-bold text-slate-900">7/24 Kartlı Giriş</div>
                </div>
              </div>
            </div>
          </div>

          {/* Olanaklar Listesi */}
          {space.amenities && space.amenities.length > 0 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Coffee size={20} className="w-5 h-5 text-indigo-600 shrink-0" />
                  <span>Sunulan Olanaklar</span>
                </h2>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                  {space.amenities.length} Olanak
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {space.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100 text-sm font-medium text-slate-700 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all cursor-default"
                  >
                    <CheckCircle size={18} className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dikey alt boşluk koruyucu alan */}
          <div className="h-12 sm:h-20 w-full" aria-hidden="true" />
        </div>

        {/* Sağ Kolon: Rezervasyon Kartı (Yapışkan / Sticky) */}
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