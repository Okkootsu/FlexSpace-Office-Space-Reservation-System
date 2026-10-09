"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  Compass,
  CalendarCheck2,
  PlusCircle,
  Menu,
  X,
  Sparkles,
  User,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      name: "Mekanları Keşfet",
      href: "/spaces",
      icon: Compass,
      active: pathname === "/spaces" || pathname.startsWith("/spaces/"),
      isNew: false,
    },
    {
      name: "Rezervasyonlarım",
      href: "/dashboard",
      icon: CalendarCheck2,
      active: pathname === "/dashboard",
      isNew: false,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group cursor-pointer focus:outline-none"
        >
          <div className="w-8 h-8 p-[5px] rounded-2xl bg-linear-to-tr from-indigo-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/25 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-indigo-600/35 transition-all">
            <Building2 className="w-full h-full transition-transform group-hover:rotate-[-4deg]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                Flex<span className="text-indigo-600">Space</span>
              </span>
              {/* <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60 uppercase tracking-wider">
                <Sparkles className="w-2.5 h-2.5 text-indigo-600" />
                Ofis
              </span> */}
            </div>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide -mt-0.5 hidden sm:block">
              Akıllı Çalışma Alanları
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/70 p-1.5 rounded-2xl border border-slate-200/60">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.active && !(link.href === "/spaces" && pathname === "/spaces/new");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-white text-indigo-600 shadow-xs shadow-slate-900/5 font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Actions & Profile */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/spaces/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm shadow-md shadow-indigo-600/25 hover:shadow-lg hover:shadow-indigo-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Mekan Ekle</span>
          </Link>

          {/* User Profile Mini Badge */}
          <Link
            href="/dashboard"
            title="Profil ve Rezervasyonlarım"
            className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-slate-200/80 hover:border-indigo-300 hover:bg-slate-50 transition cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
              <User className="w-4 h-4" />
            </div>
            <div className="text-left text-xs">
              <div className="font-semibold text-slate-800 leading-tight">Hesabım</div>
              <div className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Aktif
              </div>
            </div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/spaces/new"
            className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs cursor-pointer"
            aria-label="Mekan Ekle"
          >
            <PlusCircle className="w-5 h-5" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            aria-label="Menüyü Aç/Kapat"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = link.active && !(link.href === "/spaces" && pathname === "/spaces/new");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition cursor-pointer ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-5 h-5 text-indigo-600" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/spaces/new"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm shadow-md cursor-pointer hover:bg-indigo-700 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Mekanını Listele</span>
            </Link>

            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-50 transition cursor-pointer"
            >
              <User className="w-4 h-4 text-slate-500" />
              <span>Hesap ve Rezervasyonlar</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
