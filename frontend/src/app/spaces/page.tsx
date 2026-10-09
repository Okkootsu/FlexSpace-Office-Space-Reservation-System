import { spacesApi } from "@/features/spaces/api";
import { SpaceCard } from "@/features/spaces/components/SpaceCard";
import { SpaceFilters } from "@/features/spaces/components/SpaceFilters";
import { Space, SpaceType } from "@/features/spaces/types";
import Link from "next/link";
import { Sparkles, Building2, PlusCircle, SearchX } from "lucide-react";

interface SpacesPageProps {
  searchParams: Promise<{
    city?: string;
    type?: string;
    minCapacity?: string;
  }>;
}

export const metadata = {
  title: "Tüm Çalışma Alanları | FlexSpace",
  description: "İhtiyacınıza uygun çalışma masaları, toplantı odaları ve bağımsız ofisler.",
};

export default async function SpacesPage({ searchParams }: SpacesPageProps) {
  const resolvedSearchParams = await searchParams;

  const filters = {
    city: resolvedSearchParams.city,
    type: resolvedSearchParams.type ? (Number(resolvedSearchParams.type) as SpaceType) : undefined,
    minCapacity: resolvedSearchParams.minCapacity ? Number(resolvedSearchParams.minCapacity) : undefined,
  };

  // Sunucu tarafında veritabanı sorgusu (SSR)
  let spaces: Space[] = [];
  try {
    spaces = await spacesApi.getAll(filters);
  } catch (error) {
    console.error("Mekanlar getirilirken hata oluştu:", error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-32">
      {/* Başlık ve İstatistik Alanı */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Çalışma Alanlarını Keşfet
          </h1>
          <p className="text-slate-500 mt-1.5 text-sm sm:text-base max-w-2xl">
            Verimli ve ilham verici çalışma masaları, tam donanımlı toplantı odaları ve prestijli özel ofisler.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200/80 px-3 py-2 rounded-xl shadow-xs">
            Toplam <span className="text-indigo-600 font-extrabold">{spaces.length}</span> Mekan
          </span>
          <Link
            href="/spaces/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition shadow-sm cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Mekan Ekle</span>
          </Link>
        </div>
      </div>

      {/* İstemci Tarafı Filtreleme Paneli */}
      <SpaceFilters />

      {/* Mekan Kartları Grid'i */}
      {spaces.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 sm:p-16 text-center max-w-xl mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <SearchX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            Kriterlere Uygun Mekan Bulunamadı
          </h3>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            Seçtiğiniz şehir veya mekan tipi için henüz aktif ilan bulunmuyor. Filtreleri temizleyerek diğer mekanlara göz atabilirsiniz.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/spaces"
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer"
            >
              Filtreleri Sıfırla
            </Link>
            <Link
              href="/spaces/new"
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition cursor-pointer"
            >
              Yeni Mekan Ekle
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {spaces.map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      )}
    </div>
  );
}