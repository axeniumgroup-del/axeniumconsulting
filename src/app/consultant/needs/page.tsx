import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import NextLink from "next/link";

export default async function ConsultantNeedsPage() {
  const session = await auth();

  if (!session || session.user.role !== "CONSULTANT") {
    redirect("/");
  }

  const needs = await prisma.need.findMany({
    where: { status: "OPEN" },
    orderBy: { createdAt: "desc" },
    include: {
      skills: true,
    },
  });

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold text-[#231f20]">Opportunités de Missions</h1>
        <p className="text-slate-500">Trouvez la mission qui correspond parfaitement à vos compétences.</p>
      </div>

      {needs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-500">Aucune mission ouverte pour le moment.</p>
          <p className="text-sm text-slate-400 mt-2">Revenez plus tard ou optimisez votre profil pour être alerté.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {needs.map(need => (
            <div key={need.id} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-[#ee0c5d]/30 transition-colors">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-slate-800">{need.title}</h3>
                  <p className="text-slate-600 text-sm line-clamp-3">{need.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {need.skills.map(skill => (
                      <span key={skill.id} className="text-[10px] px-2 py-1 bg-slate-100 text-slate-600 rounded-md font-semibold uppercase">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-2 text-sm">
                    <span className="text-slate-500 flex items-center gap-1">
                      Budget: <b className="text-slate-800">{need.budget?.toLocaleString()} F CFA</b>
                    </span>
                    <span className="text-slate-500 flex items-center gap-1">
                      Deadline: <b className="text-slate-800">{need.deadline ? new Date(need.deadline).toLocaleDateString() : "N/A"}</b>
                    </span>
                  </div>
                </div>
                <NextLink href={`/consultant/needs/${need.id}`}>
                  <Button className="bg-[#ee0c5d] hover:bg-[#d10a52] px-6">
                    Postuler
                  </Button>
                </NextLink>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
