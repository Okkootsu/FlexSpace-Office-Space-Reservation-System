"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { bookingsApi } from "../api";
import { ApiError } from "@/lib/api-client";

interface BookingWidgetProps {
  spaceId: string;
  hourlyPrice: number;
  currency: string;
}

export function BookingWidget({ spaceId, hourlyPrice, currency }: BookingWidgetProps) {
  const router = useRouter();

  // Varsayılan tarih olarak yarın seçiliyor
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split("T")[0];

  const [date, setDate] = useState(defaultDateStr);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("12:00");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Toplam saat ve fiyat hesabı
  const calculateHours = (): number => {
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    const total = (endH + endM / 60) - (startH + startM / 60);
    return total > 0 ? total : 0;
  };

  const totalHours = calculateHours();
  const totalPrice = (totalHours * hourlyPrice).toFixed(2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setIsSuccess(false);

    if (totalHours <= 0) {
      setErrorMessage("Bitiş saati başlangıç saatinden sonra olmalıdır.");
      setIsLoading(false);
      return;
    }

    try {
      // ISO UTC String dönüşümü
      const startUtc = new Date(`${date}T${startTime}:00Z`).toISOString();
      const endUtc = new Date(`${date}T${endTime}:00Z`).toISOString();

      // Mock guestId
      const guestId = "22222222-2222-2222-2222-222222222222";

      await bookingsApi.create({
        spaceId,
        guestId,
        startUtc,
        endUtc,
      });

      setIsSuccess(true);
      setTimeout(() => {
        router.refresh();
      }, 2000);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.errors) {
          // FluentValidation alan hataları
          const firstKey = Object.keys(err.errors)[0];
          setErrorMessage(err.errors[firstKey][0]);
        } else {
          // 409 Conflict veya iş kuralı hatası
          setErrorMessage(err.message);
        }
      } else {
        setErrorMessage("Rezervasyon yapılırken beklenmeyen bir hata oluştu.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm sticky top-24">
      <div className="flex items-baseline justify-between mb-6 pb-6 border-b border-slate-100">
        <div>
          <span className="text-2xl font-bold text-slate-900">{hourlyPrice} {currency}</span>
          <span className="text-slate-500 text-sm"> / saat</span>
        </div>
        <span className="text-xs bg-emerald-50 text-emerald-700 font-medium px-2.5 py-1 rounded-full border border-emerald-200">
          Anında Onay
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tarih Seçimi */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            Tarih
          </label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Saat Dilimi Seçimi */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Başlangıç
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Bitiş
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        {/* Fiyat Kırılımı */}
        <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 text-xs text-slate-600 my-4">
          <div className="flex justify-between">
            <span>Seçilen Süre:</span>
            <span className="font-semibold">{totalHours} Saat</span>
          </div>
          <div className="flex justify-between border-t border-slate-200/60 pt-1.5 text-sm font-bold text-slate-900">
            <span>Toplam Tutar:</span>
            <span>{totalPrice} {currency}</span>
          </div>
        </div>

        {/* Hata Bildirimi (.NET 400 veya 409 Conflict) */}
        {errorMessage && (
          <div className="flex items-start gap-2 bg-red-50 text-red-700 border border-red-200 p-3 rounded-xl text-xs">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Başarı Bildirimi */}
        {isSuccess && (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 p-3 rounded-xl text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Rezervasyonunuz başarıyla onaylandı!</span>
          </div>
        )}

        {/* Gönder Butonu */}
        <button
          type="submit"
          disabled={isLoading || totalHours <= 0}
          className="w-full py-3 px-4 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Kontrol Ediliyor...
            </>
          ) : (
            "Rezervasyonu Tamamla"
          )}
        </button>
      </form>
    </div>
  );
}