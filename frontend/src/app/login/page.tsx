"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuth } from "@/features/auth/AuthContext";
import { ApiError } from "@/lib/api-client";
import { Building2, Lock, Mail, Loader2, AlertCircle, ArrowRight } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await login({ email, password });
      toast.success("Giriş başarılı! Yönlendiriliyorsunuz...");
      router.push(redirect);
      router.refresh();
    } catch (err) {
      let msg = "Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.";
      if (err instanceof ApiError) {
        if (err.errors) {
          const firstKey = Object.keys(err.errors)[0];
          msg = err.errors[firstKey][0];
        } else {
          msg = err.message;
        }
      }
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Kart */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-indigo-950/5 p-8 sm:p-10">
        {/* Logo & Başlık */}
        <div className="text-center mb-6 flex flex-col justify-center items-center gap-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Tekrar Hoş Geldiniz
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            FlexSpace hesabınıza giriş yaparak çalışma alanlarınızı yönetin.
          </p>
        </div>

        {/* Hata Bildirimi */}
        {/* {errorMessage && (
          <div className="mb-6 flex items-center gap-2.5 bg-red-50 text-red-700 border border-red-200 p-3.5 rounded-2xl text-xs font-medium">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )} */}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 cursor-pointer">
              E-posta Adresi
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="adiniz@sirketiniz.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 cursor-pointer">
                Şifre
              </label>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 px-4 rounded-2xl text-sm font-bold bg-linear-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Giriş Yapılıyor...</span>
              </>
            ) : (
              <>
                <span>Giriş Yap</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Alt Kayıt Linki */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
          Hesabınız yok mu?{" "}
          <Link
            href={`/register${redirect !== "/dashboard" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
            className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            Hemen Kayıt Olun
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="text-center text-sm text-slate-400">Yükleniyor...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
