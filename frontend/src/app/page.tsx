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
} from "lucide-react";

export default async function HomePage() {
  let featuredSpaces: Space[] = [];
  try {
    const spaces = await spacesApi.getAll();
    featuredSpaces = spaces.slice(0, 3);
  } catch (err) {
    console.error("Öne çıkan mekanlar alınamadı:", err);
  }

  const categoryChips = [
    { label: "Hot Desk", type: SpaceType.HotDesk, icon: Laptop },
    { label: "Sabit Masa", type: SpaceType.DedicatedDesk, icon: Briefcase },
    { label: "Toplantı Odası", type: SpaceType.MeetingRoom, icon: Users },
    { label: "Özel Ofis", type: SpaceType.PrivateOffice, icon: Building },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero Bölümü */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 bg-linear-to-b from-indigo-50/60 via-white to-transparent text-center px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            İstediğin Zaman, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-violet-600">
              İstediğin Yerde Çalış.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Uzun süreli sözleşmelere ve taahhütlere gerek yok. İhtiyacın olan
            saat kadar masa, toplantı odası veya özel ofis kirala.
          </p>

          {/* Arama Çubuğu */}
          <div className="pt-6">
            <HeroSearch />
          </div>

          {/* Kategori Çipleri */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            <span className="text-xs font-medium text-slate-400 mr-1">
              Hızlı Keşfet:
            </span>
            {categoryChips.map((chip, idx) => {
              const Icon = chip.icon;
              return (
                <Link
                  key={idx}
                  href={`/spaces?type=${chip.type}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:border-indigo-500 hover:text-indigo-600 transition shadow-sm"
                >
                  <Icon className="w-3.5 h-3.5 text-slate-400" />
                  <span>{chip.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Değer Önerisi (Avantajlar) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">
                Saatlik Rezervasyon
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Yalnızca kullandığınız süre için ödeme yapın. Aylık veya yıllık
                zorunlu sözleşmelerle uğraşmayın.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">
                Anında Onay
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Müsaitlik kontrolü gerçek zamanlı yapılır, çakışma yaşanmaz ve
                rezervasyonunuz anında kesinleşir.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-violet-50 text-violet-600 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">
                24 Saate Kadar Ücretsiz İptal
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Planlarınız değişirse başlangıç saatine 24 saat kalana kadar tek
                tıkla kesintisiz iptal edin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Öne Çıkan Mekanlar (Server-Rendered Grid) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Popüler Seçenekler
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Öne Çıkan Çalışma Alanları
            </h2>
          </div>
          <Link
            href="/spaces"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition"
          >
            <span>Tüm Mekanları Gör</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {featuredSpaces.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
            <p className="text-slate-500 text-sm">
              Henüz listelenmiş bir mekan bulunmuyor.
            </p>
            <Link
              href="/spaces/new"
              className="mt-3 inline-block text-xs font-semibold text-indigo-600 hover:underline"
            >
              İlk mekanı siz ekleyin →
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
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-linear-to-r from-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Boş Masalarınızı ve Odalarınızı Değerlendirin
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Mekanınızı FlexSpace topluluğuyla buluşturun, saatlik olarak
              kiralayın ve ek gelir elde edin.
            </p>
          </div>
          <Link
            href="/spaces/new"
            className="px-6 py-3.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm transition shrink-0 shadow-lg"
          >
            Mekanını Listelemeye Başla
          </Link>
        </div>
      </section>
    </div>
  );
}
