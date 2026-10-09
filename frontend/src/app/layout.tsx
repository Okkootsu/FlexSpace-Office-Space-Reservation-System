import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
    <html lang="tr" className="h-full scroll-smooth">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased selection:bg-indigo-500 selection:text-white`}>
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}