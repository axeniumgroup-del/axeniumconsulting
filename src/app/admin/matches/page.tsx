"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  Briefcase,
  ChevronRight
} from "lucide-react";

interface Match {
  id: string;
  status: string;
  compatibilityScore: number | null;
  message: string | null;
  createdAt: string;
  need: {
    title: string;
    client: {
      name: string;
      email: string;
    };
  };
  consultant: {
    name: string;
    email: string;
  };
}

export default function AdminMatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await fetch("/api/admin/matches");
        const data = await res.json();
        setMatches(data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMatches();
  }, []);

  async function updateStatus(id: string, status: string) {
    try {
      const res = await fetch(`/api/admin/matches/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setMatches((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status } : m))
        );
      }
    } catch (error) {
      console.error("Error updating match:", error);
    }
  }

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Validation des Matchings</h1>
          <p className="text-slate-500">Révisez et validez les mises en relation entre clients et consultants</p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
          <span className="text-blue-700 font-medium">
            {matches.filter(m => m.status === "PENDING").length} en attente
          </span>
        </div>
      </div>

      <div className="grid gap-6">
        {matches.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-slate-500">Aucun matching pour le moment.</p>
          </div>
        ) : (
          matches.map((match) => (
            <div
              key={match.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      <Briefcase size={20} />
                    </div>
                    <h3 className="font-bold text-lg text-slate-800">{match.need.title}</h3>
                    <span className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${
                      match.status === "ADMIN_VALIDATED" ? "bg-green-100 text-green-700" :
                      match.status === "REJECTED" ? "bg-red-100 text-red-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>
                      {match.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <User size={18} className="text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-400 uppercase font-bold">Client</p>
                        <p className="font-medium text-slate-700">{match.need.client.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <User size={18} className="text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-400 uppercase font-bold">Consultant</p>
                        <p className="font-medium text-slate-700">{match.consultant.name}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {new Date(match.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-blue-600">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      Score: {match.compatibilityScore}%
                    </div>
                  </div>

                  {match.message && (
                    <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-slate-300 italic text-slate-600 text-sm">
                      "{match.message}"
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3 justify-center min-w-[160px]">
                  {match.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => updateStatus(match.id, "ADMIN_VALIDATED")}
                        className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
                      >
                        <CheckCircle size={18} />
                        Valider
                      </button>
                      <button
                        onClick={() => updateStatus(match.id, "REJECTED")}
                        className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded-xl font-medium transition-colors"
                      >
                        <XCircle size={18} />
                        Rejeter
                      </button>
                    </>
                  )}
                  {match.status === "ADMIN_VALIDATED" && (
                    <button
                      className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-slate-100 text-slate-500 rounded-xl font-medium cursor-not-allowed"
                      disabled
                    >
                      <ChevronRight size={18} />
                      Validé
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
