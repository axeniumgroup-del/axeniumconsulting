import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function ConsultantDashboard() {
  const session = await auth();

  if (!session || session.user.role !== "CONSULTANT") {
    redirect("/");
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Tableau de bord Consultant</h1>
      <p className="text-slate-600">Bienvenue dans votre espace expert. Bientôt, vous pourrez ici trouver des opportunités de missions.</p>
      <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg text-blue-700">
        Si vous n'avez pas encore complété votre profil, rendez-vous sur <a href="/consultant/onboarding" className="underline font-bold">l'onboarding</a>.
      </div>
    </div>
  );
}
