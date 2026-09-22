"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Booking, BookingStatus } from "../types";
import { bookingsApi } from "../api";
import { ApiError } from "@/lib/api-client";
import { Calendar, Clock, MapPin, AlertCircle, Loader2, ArrowRight } from "lucide-react";

interface BookingItemCardProps {
  booking: Booking;
  guestId: string;
}

export function BookingItemCard({ booking, guestId }: BookingItemCardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startDate = new Date(booking.startUtc);
  const endDate = new Date(booking.endUtc);

  const formattedDate = startDate.toLocaleDateString("tr-TR", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedStartTime = startDate.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedEndTime = endDate.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleCancel = async () => {
    const isConfirmed = window.confirm(
      "Bu rezervasyonu iptal etmek istediğinize emin misiniz? Bu işlem geri alınamaz."
    );

    if (!isConfirmed) return;

    setIsLoading(true);
    setError(null);

    try {
      await bookingsApi.cancel(booking.id, guestId);
      // verileri yenile
      router.refresh();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("İptal işlemi sırasında bir hata oluştu.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isCancelled = booking.status === BookingStatus.Cancelled;

  return (
    <div className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all duration-200 shadow-sm ${
      isCancelled ? "border-slate-200 bg-slate-50/60 opacity-75" : "border-slate-200 hover:border-slate-300"
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{booking.spaceCity}, {booking.spaceDistrict}</span>
          </div>
          <Link
            href={`/spaces/${booking.spaceId}`}
            className="font-bold text-lg text-slate-900 hover:text-indigo-600 transition flex items-center gap-1.5"
          >
            <span>{booking.spaceTitle}</span>
            <ArrowRight className="w-4 h-4 opacity-50" />
          </Link>
        </div>

        {/* Durum Rozeti */}
        <div>
          {isCancelled ? (
            <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
              İptal Edildi
            </span>
          ) : (
            <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Onaylandı
            </span>
          )}
        </div>
      </div>

      {/* Tarih, Saat ve Tutar Bilgileri */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>
            {formattedStartTime} - {formattedEndTime} ({booking.totalHours} saat)
          </span>
        </div>
        <div className="sm:text-right">
          <span className="text-xs text-slate-400 block">Toplam Tutar</span>
          <span className="text-base font-bold text-slate-900">
            {booking.totalPrice} {booking.currency}
          </span>
        </div>
      </div>

      {/* Hata Bildirimi */}
      {error && (
        <div className="flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 p-3 rounded-xl text-xs my-2">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* İptal Butonu ve Politikası */}
      {!isCancelled && (
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            {booking.canBeCancelled ? (
              <span className="text-emerald-600">✓ Başlangıç saatine 24 saatten fazla olduğu için ücretsiz iptal edilebilir.</span>
            ) : (
              <span className="text-amber-600">⚠️ Başlangıç saatine 24 saatten az kaldığı için iptal edilemez.</span>
            )}
          </div>

          {booking.canBeCancelled && (
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-3.5 py-2 rounded-xl transition border border-red-200 disabled:opacity-50 flex items-center justify-center gap-1.5 self-end sm:self-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  İptal Ediliyor...
                </>
              ) : (
                "Rezervasyonu İptal Et"
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}