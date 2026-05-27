import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import NextLink from "next/link";

export default async function NeedsPage() {
  const session = await auth();

  if (!session || session.user.role !== "CLIENT") {
    redirect("/");
  }

  const needs = await prisma.need.findMany({
    where: { clientId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#231f20]">Mes Besoins</h1>
        <NextLink href="/client/needs/create">
          <Button className="bg-[#ee0c5d] hover:bg-[#d10a52]">
            + Publier un besoin
          </Button>
        </NextLink>
      </div>

      {needs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-500">Vous n'avez pas encore publié de besoins.</p>
          <NextLink href="/client/needs/create" className="text-[#ee0c5d] font-bold hover:underline mt-2 inline-block">
            C'est parti !
          </NextLink>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {needs.map(need => (
            <div key={need.id} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex justify-between items-start">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-800">{need.title}</h3>
                <p className="text-slate-600 text-sm line-clamp-2">{need.description}</p>
                <div className="flex gap-2 pt-2">
                  <span className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-500 font-medium">
                    Budget: {need.budget?.toLocaleString()} F CFA
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${need.status === "OPEN" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                    {need.status}
                  </span>
                </div>
              </div>
              <NextLink href={`/client/needs/${need.id}`} className="text-[#ee0c5d] font-semibold text-sm hover:underline">
                Gérer
              </NextLink>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
