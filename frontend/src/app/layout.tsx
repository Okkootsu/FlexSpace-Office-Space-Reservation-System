import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/features/auth/AuthContext";

import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlexSpace | Esnek Çalışma ve Toplantı Alanları",
  description: "İhtiyacınıza uygun çalışma masası, toplantı odası veya ofisi anında kiralayın.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="h-full scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased selection:bg-indigo-500 selection:text-white`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              className: "text-xs font-semibold rounded-2xl shadow-lg border border-slate-200/80 mt-16",
              style: {
                background: "#ffffff",
                color: "#0f172a",
                padding: "12px 16px",
              },
            }}
          />
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          {/* <Footer /> */}
        </AuthProvider>
      </body>
    </html>
  );
}