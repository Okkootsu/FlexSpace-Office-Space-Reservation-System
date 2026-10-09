"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { spacesApi } from "../api";
import { SpaceType, CreateSpacePayload } from "../types";
import { ApiError } from "@/lib/api-client";
import {
  Plus,
  X,
  Loader2,
  AlertCircle,
  Building,
  DollarSign,
  MapPin,
  Coffee,
  Check,
  Sparkles,
} from "lucide-react";

const SUGGESTED_AMENITIES = [
  "Yüksek Hızlı Wi-Fi",
  "Projeksiyon & Perde",
  "Beyaz Tahta",
  "Sınırsız İkram Çay / Kahve",
  "Ses Yalıtımı",
  "Harici Monitör",
  "Ergonomik Ofis Koltuğu",
  "Yazıcı / Tarayıcı",
  "7/24 Kartlı Giriş",
  "Dinlenme Alanı",
];

export function CreateSpaceForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: SpaceType.MeetingRoom,
    capacity: 4,
    hourlyPriceAmount: 250,
    currency: "TRY",
    city: "İstanbul",
    district: "",
    street: "",
    postalCode: "",
  });

  const [amenityInput, setAmenityInput] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleAddAmenity = (textToAdd?: string) => {
    const val = (textToAdd || amenityInput).trim();
    if (val && !amenities.includes(val)) {
      setAmenities([...amenities, val]);
      if (!textToAdd) setAmenityInput("");
    }
  };

  const handleRemoveAmenity = (indexToRemove: number) => {
    setAmenities(amenities.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneralError(null);
    setFieldErrors({});

    // Mock GUID
    const hostId = "11111111-1111-1111-1111-111111111111";

    const payload: CreateSpacePayload = {
      hostId,
      ...formData,
      type: Number(formData.type) as SpaceType,
      capacity: Number(formData.capacity),
      hourlyPriceAmount: Number(formData.hourlyPriceAmount),
      amenities,
    };

    try {
      const createdSpaceId = await spacesApi.create(payload);
      router.push(`/spaces/${createdSpaceId}`);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.errors) {
          setFieldErrors(err.errors);
        } else {
          setGeneralError(err.message);
        }
      } else {
        setGeneralError("Mekan oluşturulurken bir hata meydana geldi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {generalError && (
        <div className="flex items-center gap-3 bg-red-50 text-red-700 border border-red-200 p-4 rounded-2xl text-sm font-medium">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
          <span>{generalError}</span>
        </div>
      )}

      {/* Bölüm 1: Genel Bilgiler */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 text-slate-800 font-bold text-lg">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Building className="w-4 h-4" />
          </div>
          <span>Temel Bilgiler</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 cursor-pointer">
              Mekan Başlığı *
            </label>
            <input
              type="text"
              placeholder="Örn: Levent Loft - 8 Kişilik VIP Toplantı Odası"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            {fieldErrors.Title && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.Title[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 cursor-pointer">
              Açıklama *
            </label>
            <textarea
              rows={3}
              placeholder="Mekanın sunduğu imkanlar, aydınlatması, mimarisi ve çalışma ortamı hakkında detaylı bilgi verin..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            {fieldErrors.Description && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.Description[0]}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 cursor-pointer">
                Mekan Türü *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value={SpaceType.HotDesk}>Hot Desk (Serbest Masa)</option>
                <option value={SpaceType.DedicatedDesk}>Sabit Masa</option>
                <option value={SpaceType.MeetingRoom}>Toplantı Odası</option>
                <option value={SpaceType.PrivateOffice}>Özel Ofis</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 cursor-pointer">
                Kapasite (Kişi Sayısı) *
              </label>
              <input
                type="number"
                min="1"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                required
              />
              {fieldErrors.Capacity && (
                <p className="text-xs text-red-600 mt-1">{fieldErrors.Capacity[0]}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bölüm 2: Fiyatlandırma */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 text-slate-800 font-bold text-lg">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-4 h-4" />
          </div>
          <span>Fiyatlandırma & Para Birimi</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 cursor-pointer">
              Saatlik Kira Ücreti *
            </label>
            <input
              type="number"
              step="0.01"
              min="1"
              value={formData.hourlyPriceAmount}
              onChange={(e) => setFormData({ ...formData, hourlyPriceAmount: Number(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              required
            />
            {fieldErrors.HourlyPriceAmount && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.HourlyPriceAmount[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 cursor-pointer">
              Para Birimi
            </label>
            <input
              type="text"
              maxLength={3}
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value.toUpperCase() })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono uppercase cursor-pointer"
              required
            />
            {fieldErrors.Currency && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.Currency[0]}</p>
            )}
          </div>
        </div>
      </div>

      {/* Bölüm 3: Konum Bilgisi */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 text-slate-800 font-bold text-lg">
          <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
            <MapPin className="w-4 h-4" />
          </div>
          <span>Konum ve Adres</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 cursor-pointer">
              Şehir *
            </label>
            <input
              type="text"
              placeholder="Örn: İstanbul"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              required
            />
            {fieldErrors.City && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.City[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 cursor-pointer">
              İlçe / Semt *
            </label>
            <input
              type="text"
              placeholder="Örn: Levent, Beşiktaş"
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              required
            />
            {fieldErrors.District && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.District[0]}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 cursor-pointer">
            Cadde, Sokak ve Bina Bilgisi *
          </label>
          <input
            type="text"
            placeholder="Örn: Büyükdere Cad. No:193 Plaza Kat:5"
            value={formData.street}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            required
          />
          {fieldErrors.Street && (
            <p className="text-xs text-red-600 mt-1">{fieldErrors.Street[0]}</p>
          )}
        </div>
      </div>

      {/* Bölüm 4: Olanaklar */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5 text-slate-800 font-bold text-lg">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Coffee className="w-4 h-4" />
            </div>
            <span>Sunulan Olanaklar</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {amenities.length} olanak eklendi
          </span>
        </div>

        {/* Özel Olanak Ekleme Kutusu */}
        <div className="flex gap-2.5">
          <input
            type="text"
            placeholder="Örn: Ses Geçirmez Podcast Kabini, Çift Monitör..."
            value={amenityInput}
            onChange={(e) => setAmenityInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddAmenity();
              }
            }}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={() => handleAddAmenity()}
            className="bg-slate-900 text-white px-5 py-3 rounded-2xl text-xs font-bold hover:bg-slate-800 transition flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Ekle</span>
          </button>
        </div>

        {/* Hızlı Öneri Çipleri (Tıklanabilir) */}
        <div className="space-y-2 pt-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-500" />
            <span>Hızlı Öneriler (Tıklayarak Ekleyin):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_AMENITIES.map((suggestion) => {
              const isAlreadyAdded = amenities.includes(suggestion);
              return (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => !isAlreadyAdded && handleAddAmenity(suggestion)}
                  disabled={isAlreadyAdded}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${isAlreadyAdded
                      ? "bg-slate-100 text-slate-400 border border-slate-200/60 cursor-default"
                      : "bg-indigo-50/70 text-indigo-700 border border-indigo-100 hover:bg-indigo-100 hover:border-indigo-200 active:scale-95"
                    }`}
                >
                  {isAlreadyAdded ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Plus className="w-3 h-3" />
                  )}
                  <span>{suggestion}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Eklenmiş Olanaklar Listesi */}
        {amenities.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500">Mekanda Yer Alacak Olanaklar:</span>
            <div className="flex flex-wrap gap-2">
              {amenities.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-800 border border-indigo-200/80 px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-2xs"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAmenity(index)}
                    className="text-indigo-400 hover:text-red-600 transition cursor-pointer p-0.5 rounded-full hover:bg-red-50"
                    title="Kaldır"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Kaydet Butonu */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-10 py-4 rounded-2xl text-sm font-bold bg-linear-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Mekan Kaydediliyor...</span>
            </>
          ) : (
            <span>Mekanı Yayınla</span>
          )}
        </button>
      </div>
    </form>
  );
}