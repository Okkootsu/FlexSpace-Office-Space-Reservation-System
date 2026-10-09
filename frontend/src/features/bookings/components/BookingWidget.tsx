"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, AlertCircle, CheckCircle2, Loader2, Zap, ShieldCheck } from "lucide-react";
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
        router.push("/dashboard");
      }, 1500);
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
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-lg shadow-indigo-950/5 sticky top-24">
      {/* Üst Fiyat ve Güvence */}
      <div className="flex items-baseline justify-between mb-6 pb-5 border-b border-slate-100">
        <div>
          <span className="text-3xl font-black text-slate-900">{hourlyPrice} {currency}</span>
          <span className="text-slate-400 text-sm font-medium"> / saat</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tarih Seçimi */}
        <div>
          <label htmlFor="booking-date" className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5 cursor-pointer">
            Rezervasyon Tarihi
          </label>
          <input
            id="booking-date"
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            required
          />
        </div>

        {/* Saat Dilimi Seçimi */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="booking-start-time" className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5 cursor-pointer">
              Giriş Saati
            </label>
            <input
              id="booking-start-time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              required
            />
          </div>
          <div>
            <label htmlFor="booking-end-time" className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5 cursor-pointer">
              Çıkış Saati
            </label>
            <input
              id="booking-end-time"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              required
            />
          </div>
        </div>

        {/* Fiyat ve Süre Özeti */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2 text-xs text-slate-600 my-4">
          <div className="flex justify-between items-center">
            <span>Seçilen Süre:</span>
            <span className="font-bold text-slate-800">{totalHours} Saat</span>
          </div>
          <div className="flex justify-between items-center text-slate-500">
            <span>Birim Fiyat:</span>
            <span>{hourlyPrice} {currency} × {totalHours}</span>
          </div>
          <div className="flex justify-between items-center border-t border-slate-200/80 pt-2 text-base font-black text-slate-900">
            <span>Toplam Tutar:</span>
            <span className="text-indigo-600">{totalPrice} {currency}</span>
          </div>
        </div>

        {/* Hata Bildirimi */}
        {errorMessage && (
          <div className="flex items-start gap-2.5 bg-red-50 text-red-700 border border-red-200 p-3.5 rounded-2xl text-xs">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        {/* Başarı Bildirimi */}
        {isSuccess && (
          <div className="flex items-center gap-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 p-3.5 rounded-2xl text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Rezervasyonunuz başarıyla onaylandı! Yönlendiriliyorsunuz...</span>
          </div>
        )}

        {/* Gönder Butonu */}
        <button
          type="submit"
          disabled={isLoading || totalHours <= 0}
          className="w-full py-4 px-4 rounded-2xl text-sm font-bold bg-linear-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Kontrol Ediliyor...</span>
            </>
          ) : (
            <span>Rezervasyonu Onayla</span>
          )}
        </button>

        <div className="pt-2 text-center">
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            24 saat öncesine kadar ücretsiz iptal güvencesi
          </span>
        </div>
      </form>
    </div>
  );
}