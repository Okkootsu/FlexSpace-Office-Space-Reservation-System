"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Booking, BookingStatus } from "../types";
import { bookingsApi } from "../api";
import { ApiError } from "@/lib/api-client";
import { Calendar, Clock, MapPin, AlertCircle, Loader2, ArrowRight, Ban, CheckCircle } from "lucide-react";

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
    weekday: "long",
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
    <div
      className={`bg-white rounded-3xl border p-6 sm:p-7 transition-all duration-200 shadow-sm ${
        isCancelled
          ? "border-slate-200/80 bg-slate-50/50 opacity-75"
          : "border-slate-200/90 hover:border-indigo-300 hover:shadow-md"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-indigo-600" />
            <span>{booking.spaceCity}, {booking.spaceDistrict}</span>
          </div>
          <Link
            href={`/spaces/${booking.spaceId}`}
            className="font-bold text-lg sm:text-xl text-slate-900 hover:text-indigo-600 transition flex items-center gap-2 group cursor-pointer"
          >
            <span>{booking.spaceTitle}</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Durum Rozeti */}
        <div>
          {isCancelled ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full bg-red-50 text-red-700 border border-red-200">
              <Ban className="w-3.5 h-3.5 text-red-500" />
              İptal Edildi
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              Onaylandı
            </span>
          )}
        </div>
      </div>

      {/* Tarih, Saat ve Tutar Bilgileri */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-5 text-sm text-slate-600">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Tarih</div>
            <div className="font-semibold text-slate-800">{formattedDate}</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Zaman Dilimi</div>
            <div className="font-semibold text-slate-800">
              {formattedStartTime} - {formattedEndTime} ({booking.totalHours} saat)
            </div>
          </div>
        </div>

        <div className="sm:text-right">
          <span className="text-[11px] text-slate-400 font-medium block">Toplam Ödeme</span>
          <span className="text-lg font-black text-slate-900">
            {booking.totalPrice} <span className="text-xs font-bold text-slate-500">{booking.currency}</span>
          </span>
        </div>
      </div>

      {/* Hata Bildirimi */}
      {error && (
        <div className="flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 p-3.5 rounded-2xl text-xs my-2">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* İptal Butonu ve Politikası */}
      {!isCancelled && (
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs">
            {booking.canBeCancelled ? (
              <span className="text-emerald-700 font-medium flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                Başlangıç saatine 24 saatten fazla olduğu için ücretsiz iptal edilebilir.
              </span>
            ) : (
              <span className="text-amber-700 font-medium flex items-center gap-1.5">
                ⚠️ Başlangıç saatine 24 saatten az kaldığı için iptal edilemez.
              </span>
            )}
          </div>

          {booking.canBeCancelled && (
            <button
              onClick={handleCancel}
              disabled={isLoading}
              type="button"
              className="text-xs font-bold text-red-600 hover:text-white hover:bg-red-600 bg-red-50 px-4 py-2 rounded-xl transition-all border border-red-200 disabled:opacity-50 flex items-center justify-center gap-1.5 self-end sm:self-auto cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>İptal Ediliyor...</span>
                </>
              ) : (
                <span>Rezervasyonu İptal Et</span>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}