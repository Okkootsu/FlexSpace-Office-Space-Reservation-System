import Link from "next/link";
import { spacesApi } from "@/features/spaces/api";
import { SpaceCard } from "@/features/spaces/components/SpaceCard";
import { HeroSearch } from "@/features/spaces/components/HeroSearch";
import { Space, SpaceType } from "@/features/spaces/types";
import {
  Zap,
  Clock,
  ShieldCheck,
  ArrowRight,
  Laptop,
  Briefcase,
  Users,
  Building,
  Sparkles,
  MapPin,
  CheckCircle,
} from "lucide-react";

const HERO_BACKGROUND_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80";

export default async function HomePage() {
  let featuredSpaces: Space[] = [];
  try {
    const spaces = await spacesApi.getAll();
    featuredSpaces = spaces.slice(0, 3);
  } catch (err) {
    console.error("Öne çıkan mekanlar alınamadı:", err);
  }

  const categoryChips = [
    { label: "Hot Desk", type: SpaceType.HotDesk, icon: Laptop, color: "text-emerald-500" },
    { label: "Sabit Masa", type: SpaceType.DedicatedDesk, icon: Briefcase, color: "text-blue-500" },
    { label: "Toplantı Odası", type: SpaceType.MeetingRoom, icon: Users, color: "text-purple-500" },
    { label: "Özel Ofis", type: SpaceType.PrivateOffice, icon: Building, color: "text-amber-500" },
  ];

  const popularCities = ["İstanbul", "Ankara", "İzmir", "Kocaeli"];

  return (
    <div className="space-y-16 pb-24">
      {/* 1. Hero Bölümü - Arka Plan Resmi + Gradyan Geçiş Katmanı */}
      <section className="relative pt-20 pb-28 md:pt-28 md:pb-36 text-center px-4 overflow-hidden">
        {/* Arka Plan Görsel Katmanı */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('${HERO_BACKGROUND_IMAGE}')`,
          }}
        />

        {/* Aşağı Doğru Kademeli Gradyan ve Karartma Katmanı */}
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/85 via-slate-900/80 to-slate-950" />

        {/* Işık Hüzmesi Efektleri (Ambient Glow) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Hero İçeriği */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.12]">
            İstediğin Zaman, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-300 via-indigo-200 to-violet-300 drop-shadow-sm">
              İstediğin Yerde Çalış.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Uzun süreli sözleşmelere ve taahhütlere son. İhtiyacın olan saat kadar masa, toplantı odası veya bağımsız ofis kirala; anında çalışmaya başla.
          </p>

          {/* Arama Çubuğu */}
          <div className="pt-4">
            <HeroSearch />
          </div>

          {/* Hızlı Filtreleme ve Kategori Çipleri */}
          <div className="space-y-3 pt-4">
            {/* <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-bold text-slate-300 mr-1 uppercase tracking-wider">
                Mekan Türleri:
              </span>
              {categoryChips.map((chip, idx) => {
                const Icon = chip.icon;
                return (
                  <Link
                    key={idx}
                    href={`/spaces?type=${chip.type}`}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-xs font-semibold text-white hover:text-indigo-200 hover:border-indigo-400/50 transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Icon className={`w-3.5 h-3.5 ${chip.color}`} />
                    <span>{chip.label}</span>
                  </Link>
                );
              })}
            </div> */}

            {/* Popüler Şehirler Hızlı Tıklama */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Popüler Şehirler:</span>
              {popularCities.map((city) => (
                <Link
                  key={city}
                  href={`/spaces?city=${city}`}
                  className="inline-flex items-center gap-1 text-slate-300 hover:text-indigo-300 hover:underline cursor-pointer transition font-medium"
                >
                  <MapPin className="w-3 h-3 text-indigo-400" />
                  <span>{city}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Değer Önerisi (Avantajlar) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
            Neden FlexSpace?
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Geleneksel Ofis Masraflarına Son Verin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">
                  Saatlik ve Esnek Rezervasyon
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Yalnızca kullandığınız süre için şeffaf ödeme yapın. Depozito, taahhüt veya aylık zorunlu aboneliklerle uğraşmayın.
                </p>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-indigo-600">
              <CheckCircle className="w-4 h-4 mr-1 text-emerald-500" />
              Sıfır ek maliyet
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">
                  Anında Onaylı Rezervasyon
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Müsaitlik kontrolü gerçek zamanlı çalışır, çakışma yaşanmaz ve rezervasyonunuz oluşturulduğu an teyit edilir.
                </p>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-indigo-600">
              <CheckCircle className="w-4 h-4 mr-1 text-emerald-500" />
              7/24 kesintisiz erişim
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">
                  24 Saate Kadar Ücretsiz İptal
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Planlarınız değişirse rezervasyon başlangıç saatine 24 saat kalana kadar panonuzdan tek tıkla kesintisiz iptal edebilirsiniz.
                </p>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-indigo-600">
              <CheckCircle className="w-4 h-4 mr-1 text-emerald-500" />
              Esnek iade garantisi
            </div>
          </div>
        </div>
      </section>

      {/* 3. Öne Çıkan Mekanlar (Server-Rendered Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
              Popüler Seçenekler
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Öne Çıkan Çalışma Alanları
            </h2>
          </div>
          <Link
            href="/spaces"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition cursor-pointer group"
          >
            <span>Tüm Mekanları Gör ({featuredSpaces.length > 0 ? "Filtrele" : "Keşfet"})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {featuredSpaces.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-xs">
            <p className="text-slate-500 text-sm">
              Henüz listelenmiş bir mekan bulunmuyor.
            </p>
            <Link
              href="/spaces/new"
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition shadow-sm cursor-pointer"
            >
              <span>İlk mekanı siz ekleyin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSpaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>
        )}
      </section>

      {/* 4. Mekan Sahibi (Host) Çağrısı (CTA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-linear-to-r from-slate-950 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-indigo-900/40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-3 max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Mekan Sahipleri İçin
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Boş Masalarınızı ve Odalarınızı Değerlendirin
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Mekanınızı FlexSpace topluluğuyla buluşturun, saatlik veya günlük kiralayarak düzenli ek gelir elde edin. Listelemek tamamen ücretsizdir.
            </p>
          </div>

          <Link
            href="/spaces/new"
            className="relative z-10 px-7 py-4 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm transition-all duration-200 shrink-0 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span>Mekanını Listelemeye Başla</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
