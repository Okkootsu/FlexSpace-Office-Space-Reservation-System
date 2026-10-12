"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { bookingsApi } from "@/features/bookings/api";
import { BookingItemCard } from "@/features/bookings/components/BookingItemCard";
import { CalendarCheck, ArrowRight, PlusCircle, Loader2 } from "lucide-react";
import { Booking, BookingStatus } from "@/features/bookings/types";
import { useAuth } from "@/features/auth/AuthContext";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const data = await bookingsApi.getMyBookings();
      setBookings(data || []);
    } catch (error) {
      console.error("Rezervasyonlar yüklenirken hata oluştu:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    } else if (!isAuthLoading) {
      setIsLoading(false);
    }
  }, [isAuthenticated, isAuthLoading]);

  const activeBookings = bookings.filter((b) => b.status === BookingStatus.Confirmed);
  const cancelledBookings = bookings.filter((b) => b.status === BookingStatus.Cancelled);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-32">
      {/* Üst Bilgi Başlığı */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
            {user ? `${user.fullName} • Rezervasyonlarım` : "Kullanıcı Paneli"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Rezervasyonlarım
          </h1>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">
            Aktif ve geçmiş çalışma alanı randevularınızı buradan kolayca takip edebilir veya yönetebilirsiniz.
          </p>
        </div>

        <Link
          href="/spaces"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-2xl hover:bg-indigo-700 transition shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/35 self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Yeni Alan Rezerve Et</span>
        </Link>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-16 text-center max-w-lg mx-auto shadow-sm flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
          <p className="text-sm font-semibold text-slate-600">Rezervasyonlarınız yükleniyor...</p>
        </div>
      ) : (
        <>
          {/* Mini İstatistik Şeridi */}
          {bookings.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-xs text-slate-400 font-semibold block mb-1">Toplam Randevu</span>
                <span className="text-2xl font-black text-slate-900">{bookings.length}</span>
              </div>
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-xs text-emerald-600 font-semibold block mb-1">Onaylı & Aktif</span>
                <span className="text-2xl font-black text-emerald-600">{activeBookings.length}</span>
              </div>
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs col-span-2 sm:col-span-1">
                <span className="text-xs text-slate-400 font-semibold block mb-1">İptal Edilen</span>
                <span className="text-2xl font-black text-slate-600">{cancelledBookings.length}</span>
              </div>
            </div>
          )}

          {/* Rezervasyon Listesi */}
          {bookings.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-12 sm:p-16 text-center max-w-lg mx-auto shadow-sm">
              <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
                <CalendarCheck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Henüz bir rezervasyonunuz bulunmuyor
              </h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                İhtiyacınıza en uygun toplantı odasını veya masayı keşfedip birkaç tıklamayla hemen kiralayabilirsiniz.
              </p>
              <Link
                href="/spaces"
                className="inline-flex items-center gap-2 text-xs font-bold px-6 py-3 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/25 transition cursor-pointer"
              >
                <span>Mekanları Keşfet</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <BookingItemCard
                  key={booking.id}
                  booking={booking}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}