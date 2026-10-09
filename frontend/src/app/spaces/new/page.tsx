import { CreateSpaceForm } from "@/features/spaces/components/CreateSpaceForm";
import Link from "next/link";
import { ArrowLeft, Building2, Sparkles } from "lucide-react";

export const metadata = {
  title: "Yeni Mekan Ekle | FlexSpace",
  description: "Toplantı odanızı veya çalışma masanızı FlexSpace üzerinde kiralamaya başlayın.",
};

export default function NewSpacePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-32">
      {/* Geri Dönüş Linki */}
      <div className="mb-6">
        <Link
          href="/spaces"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:border-indigo-200 hover:bg-slate-50 transition shadow-xs cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Mekanlara Geri Dön</span>
        </Link>
      </div>

      <div className="mb-8">
        
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Yeni Çalışma Alanı Listele
        </h1>
        <p className="text-slate-500 mt-1.5 text-sm sm:text-base max-w-2xl">
          Çalışma alanınızı, kapasitenizi, fiyat politikanızı ve olanaklarınızı belirleyerek dakikalar içinde kiralama ağına dahil edin.
        </p>
      </div>

      <CreateSpaceForm />
    </div>
  );
}