import Link from "next/link";
import { Building2 } from "lucide-react";

export function Navbar() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-indigo-600"
        >
          <Building2 className="w-6 h-6" />
          <span>FlexSpace</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/spaces" className="hover:text-indigo-600 transition">
            Mekanları Keşfet
          </Link>

          <Link href="/dashboard" className="hover:text-indigo-600 transition">
            Rezervasyonlarım
          </Link>
          
          <Link
            href="/spaces/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Mekan Ekle
          </Link>
        </nav>
      </div>
    </header>
  );
}
