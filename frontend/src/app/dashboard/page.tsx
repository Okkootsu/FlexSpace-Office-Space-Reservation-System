import { bookingsApi } from "@/features/bookings/api";
import { BookingItemCard } from "@/features/bookings/components/BookingItemCard";
import Link from "next/link";
import { CalendarCheck, ArrowRight } from "lucide-react";
import { Booking } from "@/features/bookings/types";

export const metadata = {
  title: "Rezervasyonlarım | FlexSpace",
  description: "Mevcut ve geçmiş rezervasyonlarınızı görüntüleyin ve yönetin.",
};

export default async function DashboardPage() {
  // Mock GuestId
  const guestId = "22222222-2222-2222-2222-222222222222";

  let bookings: Booking[] = [];
  try {
    bookings = await bookingsApi.getMyBookings(guestId);
  } catch (error) {
    console.error("Rezervasyonlar yüklenirken hata oluştu:", error);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Üst Bilgi */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Rezervasyonlarım
          </h1>
          <p className="text-slate-600 mt-1 text-sm">
            Aktif ve geçmiş çalışma alanı randevularınızı buradan takip edebilirsiniz.
          </p>
        </div>

        <Link
          href="/spaces"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition self-start sm:self-auto"
        >
          <span>Yeni Alan Rezerve Et</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Rezervasyon Listesi */}
      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">Henüz bir rezervasyonunuz yok</h3>
          <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
            İhtiyacınıza en uygun toplantı odasını veya masayı keşfedip dakikalar içinde kiralayabilirsiniz.
          </p>
          <Link
            href="/spaces"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
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
              guestId={guestId}
            />
          ))}
        </div>
      )}
    </div>
  );
}