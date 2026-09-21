import { CreateSpaceForm } from "@/features/spaces/components/CreateSpaceForm";

export const metadata = {
  title: "Yeni Mekan Ekle | FlexSpace",
  description: "Toplantı odanızı veya çalışma masanızı FlexSpace üzerinde kiralamaya başlayın.",
};

export default function NewSpacePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Yeni Mekan Tanımla
        </h1>
        <p className="text-slate-600 mt-2 text-sm">
          Çalışma alanınızı, fiyat politikanızı ve olanaklarınızı belirleyerek dakikalar içinde rezervasyona açın.
        </p>
      </div>

      <CreateSpaceForm />
    </div>
  );
}