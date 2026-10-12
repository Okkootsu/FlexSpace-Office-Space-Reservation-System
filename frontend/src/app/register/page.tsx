"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuth } from "@/features/auth/AuthContext";
import { ApiError } from "@/lib/api-client";
import { Building2, Lock, Mail, User, Loader2, AlertCircle, ArrowRight } from "lucide-react";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const { register } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneralError(null);
    setFieldErrors({});

    try {
      await register({
        fullName,
        email,
        password,
      });

      toast.success("Hesabınız başarıyla oluşturuldu! Yönlendiriliyorsunuz...");
      router.push(redirect);
      router.refresh();
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.errors) {
          setFieldErrors(err.errors);
          const firstKey = Object.keys(err.errors)[0];
          toast.error(err.errors[firstKey][0]);
        } else {
          setGeneralError(err.message);
          toast.error(err.message);
        }
      } else {
        const msg = "Kayıt işlemi sırasında beklenmeyen bir hata oluştu.";
        setGeneralError(msg);
        toast.error(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Kart */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-indigo-950/5 p-8 sm:p-10">
        {/* Logo & Başlık */}
        <div className="text-center mb-6 flex flex-col justify-center items-center gap-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Hesap Oluşturun
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            FlexSpace ailesine katılın; mekanları keşfedin, rezerve edin ve kendi alanlarınızı listeleyin.
          </p>
        </div>

        {/* Genel Hata */}
        {/* {generalError && (
          <div className="mb-6 flex items-start gap-2.5 bg-red-50 text-red-700 border border-red-200 p-3.5 rounded-2xl text-xs font-medium">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{generalError}</span>
          </div>
        )} */}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 cursor-pointer">
              Ad Soyad *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Ahmet Yılmaz"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
            {fieldErrors.FullName && (
              <p className="text-xs text-red-600 mt-1 font-medium">{fieldErrors.FullName[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 cursor-pointer">
              E-posta Adresi *
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
            {fieldErrors.Email && (
              <p className="text-xs text-red-600 mt-1 font-medium">{fieldErrors.Email[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 cursor-pointer">
              Şifre (En az 6 karakter) *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
            {fieldErrors.Password && (
              <p className="text-xs text-red-600 mt-1 font-medium">{fieldErrors.Password[0]}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3.5 px-4 rounded-2xl text-sm font-bold bg-linear-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Hesap Oluşturuluyor...</span>
              </>
            ) : (
              <>
                <span>Kayıt Ol</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Alt Giriş Linki */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
          Zaten hesabınız var mı?{" "}
          <Link
            href={`/login${redirect !== "/dashboard" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
            className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            Giriş Yapın
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="text-center text-sm text-slate-400">Yükleniyor...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
