import Link from "next/link";
import { Building2, MapPin, Mail, Phone, Heart } from "lucide-react";
import { SpaceType } from "@/features/spaces/types";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/70 backdrop-blur-md mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-extrabold text-xl tracking-tight text-slate-900 group"
            >
              <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-indigo-600 via-indigo-700 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="bg-linear-to-r from-slate-900 via-slate-800 to-indigo-950 bg-clip-text text-transparent">
                FlexSpace
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Esnek çalışma dünyasının yeni nesil rezervasyon platformu. İhtiyacın olan çalışma alanını dakikalar içinde keşfet ve anında kirala.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/spaces" className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Mekanları Keşfet
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Rezervasyonlarım
                </Link>
              </li>
              <li>
                <Link href="/spaces/new" className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Mekanını Listele
                </Link>
              </li>
            </ul>
          </div>

          {/* Spaces by category */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Alan Tipleri
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href={`/spaces?type=${SpaceType.HotDesk}`} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Hot Desk (Serbest Masa)
                </Link>
              </li>
              <li>
                <Link href={`/spaces?type=${SpaceType.DedicatedDesk}`} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Sabit Masa
                </Link>
              </li>
              <li>
                <Link href={`/spaces?type=${SpaceType.MeetingRoom}`} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Toplantı Odaları
                </Link>
              </li>
              <li>
                <Link href={`/spaces?type=${SpaceType.PrivateOffice}`} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Özel Hazır Ofis
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Highlights */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              İletişim & Destek
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Levent, Büyükdere Cad. No:193 İstanbul</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
                <a href="mailto:destek@flexspace.io" className="hover:text-indigo-600 transition cursor-pointer">
                  destek@flexspace.io
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>+90 (212) 800 40 40</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200/60 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} FlexSpace A.Ş. Tüm hakları saklıdır.</p>
          <p className="inline-flex items-center gap-1">
            Modern ofis deneyimi için tasarlandı
          </p>
        </div>
      </div>
    </footer>
  );
}
