import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { MatchAction } from "@/components/client/MatchAction";
import NextLink from "next/link";
import { updateMatchStatus } from "@/app/actions/client";

export default async function NeedDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();

  if (!session || session.user.role !== "CLIENT") {
    redirect("/");
  }

  const need = await prisma.need.findUnique({
    where: { id },
    include: {
      matches: {
        include: {
          consultant: {
            include: { consultantProfile: true }
          }
        },
        orderBy: { createdAt: "asc" }
      },
      skills: true,
    },
  });

  if (!need || need.clientId !== session.user.id) {
    redirect("/client/needs");
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <NextLink href="/client/needs" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#ee0c5d] transition-colors">
        <ArrowLeft className="w-4 h-4" /> Retour aux besoins
      </NextLink>

      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-800">{need.title}</h1>
            <p className="text-slate-500">{need.description}</p>
          </div>
          <div className="text-right space-y-1">
            <div className="text-sm font-medium text-slate-400">Budget</div>
            <div className="text-xl font-bold text-[#ee0c5d]">{need.budget?.toLocaleString()} F CFA</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {need.skills.map(skill => (
            <span key={skill.id} className="text-[10px] px-2 py-1 bg-slate-100 text-slate-600 rounded-md font-semibold uppercase">
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Candidatures ({need.matches.length})</h2>

        {need.matches.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500">Aucune candidature pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {need.matches.map(match => (
              <div key={match.id} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex justify-between items-center gap-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500">
                    {match.consultant.name?.charAt(0) || "?"}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-800">{match.consultant.name}</h4>
                      <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-bold uppercase">
                        {match.consultant.consultantProfile?.yearsExperience} ans exp.
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 italic line-clamp-2">"{match.message}"</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {match.status === "PENDING" && (
                    <MatchAction matchId={match.id} />
                  )}
                  <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${
                    match.status === "ACCEPTED" ? "bg-green-100 text-green-700" :
                    match.status === "REJECTED" ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-500"
                  }`}>
                    {match.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
