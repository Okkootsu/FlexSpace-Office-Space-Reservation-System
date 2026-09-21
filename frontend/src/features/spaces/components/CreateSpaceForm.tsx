"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { spacesApi } from "../api";
import { SpaceType, CreateSpacePayload } from "../types";
import { ApiError } from "@/lib/api-client";
import { Plus, X, Loader2, AlertCircle, Building, DollarSign, MapPin } from "lucide-react";

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
  const [amenities, setAmenities] = useState<string[]>([
    "Yüksek Hızlı Wi-Fi",
    "Beyaz Tahta",
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleAddAmenity = () => {
    if (amenityInput.trim() && !amenities.includes(amenityInput.trim())) {
      setAmenities([...amenities, amenityInput.trim()]);
      setAmenityInput("");
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
        <div className="flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 p-4 rounded-xl text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{generalError}</span>
        </div>
      )}

      {/* Bölüm 1: Genel Bilgiler */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 text-slate-800 font-bold text-lg">
          <Building className="w-5 h-5 text-indigo-600" />
          <span>Genel Bilgiler</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Mekan Başlığı *
            </label>
            <input
              type="text"
              placeholder="Örn: Levent Loft - 8 Kişilik VIP Toplantı Odası"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            {fieldErrors.Title && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.Title[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Açıklama *
            </label>
            <textarea
              rows={3}
              placeholder="Mekanın sunduğu imkanlar, aydınlatması ve çalışma ortamı hakkında bilgi verin..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            {fieldErrors.Description && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.Description[0]}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Mekan Türü *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={SpaceType.HotDesk}>Hot Desk (Serbest Masa)</option>
                <option value={SpaceType.DedicatedDesk}>Sabit Masa</option>
                <option value={SpaceType.MeetingRoom}>Toplantı Odası</option>
                <option value={SpaceType.PrivateOffice}>Özel Ofis</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Kapasite (Kişi) *
              </label>
              <input
                type="number"
                min="1"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 text-slate-800 font-bold text-lg">
          <DollarSign className="w-5 h-5 text-indigo-600" />
          <span>Fiyatlandırma</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Saatlik Ücret *
            </label>
            <input
              type="number"
              step="0.01"
              min="1"
              value={formData.hourlyPriceAmount}
              onChange={(e) => setFormData({ ...formData, hourlyPriceAmount: Number(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            {fieldErrors.HourlyPriceAmount && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.HourlyPriceAmount[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Para Birimi
            </label>
            <input
              type="text"
              maxLength={3}
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value.toUpperCase() })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono uppercase"
              required
            />
            {fieldErrors.Currency && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.Currency[0]}</p>
            )}
          </div>
        </div>
      </div>

      {/* Bölüm 3: Konum Bilgisi */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 text-slate-800 font-bold text-lg">
          <MapPin className="w-5 h-5 text-indigo-600" />
          <span>Adres ve Konum</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Şehir *
            </label>
            <input
              type="text"
              placeholder="Örn: İstanbul"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            {fieldErrors.City && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.City[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              İlçe *
            </label>
            <input
              type="text"
              placeholder="Örn: Şişli"
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            {fieldErrors.District && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.District[0]}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Cadde / Sokak / Kapı No *
          </label>
          <input
            type="text"
            placeholder="Örn: Büyükdere Cad. Plaza No:45 Kat:3"
            value={formData.street}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          {fieldErrors.Street && (
            <p className="text-xs text-red-600 mt-1">{fieldErrors.Street[0]}</p>
          )}
        </div>
      </div>

      {/* Bölüm 4: Olanaklar */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
        <h3 className="font-bold text-slate-800 text-lg pb-4 border-b border-slate-100">
          Sunulan Olanaklar
        </h3>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Örn: Projeksiyon, İkram Kahve, Ses Yalıtımı..."
            value={amenityInput}
            onChange={(e) => setAmenityInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddAmenity();
              }
            }}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={handleAddAmenity}
            className="bg-slate-100 text-slate-800 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-200 transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Ekle
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {amenities.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1.5 rounded-xl text-xs font-medium"
            >
              {item}
              <button
                type="button"
                onClick={() => handleRemoveAmenity(index)}
                className="text-indigo-400 hover:text-indigo-900"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Kaydet Butonu */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm hover:shadow"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Mekan Kaydediliyor...
            </>
          ) : (
            "Mekanı Yayınla"
          )}
        </button>
      </div>
    </form>
  );
}