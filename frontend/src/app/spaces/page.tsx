import { spacesApi } from "@/features/spaces/api";
import { SpaceCard } from "@/features/spaces/components/SpaceCard";
import { SpaceFilters } from "@/features/spaces/components/SpaceFilters";
import { Space, SpaceType } from "@/features/spaces/types";

interface SpacesPageProps {
  searchParams: Promise<{
    city?: string;
    type?: string;
    minCapacity?: string;
  }>;
}

export default async function SpacesPage({ searchParams }: SpacesPageProps) {
  const resolvedSearchParams = await searchParams;

  const filters = {
    city: resolvedSearchParams.city,
    type: resolvedSearchParams.type ? (Number(resolvedSearchParams.type) as SpaceType) : undefined,
    minCapacity: resolvedSearchParams.minCapacity ? Number(resolvedSearchParams.minCapacity) : undefined,
  };

  // Sunucu tarafında veritabanı sorgusunu tetikle (SSR)
  let spaces: Space[] = [];
  try {
    spaces = await spacesApi.getAll(filters);
  } catch (error) {
    console.error("Mekanlar getirilirken hata oluştu:", error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Başlık Alanı */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Çalışma Alanlarını Keşfet
        </h1>
        <p className="text-slate-600 mt-2 text-base">
          Verimli çalışabileceğiniz masalar, toplantı odaları ve ortak çalışma alanları.
        </p>
      </div>

      {/* İstemci Tarafı Filtreleme Paneli */}
      <SpaceFilters />

      {/* Mekan Kartları Grid'i */}
      {spaces.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
          <p className="text-slate-500 text-lg">
            Arama kriterlerinize uygun mekan bulunamadı.
          </p>
          <p className="text-sm text-slate-400 mt-1">
            Farklı bir şehir veya mekan tipi seçerek tekrar deneyebilirsiniz.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaces.map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      )}
    </div>
  );
}