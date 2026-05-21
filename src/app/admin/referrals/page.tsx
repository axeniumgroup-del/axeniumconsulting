"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Users, Gift, Award, Search, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

type Referral = {
  id: string;
  referrerId: string;
  referredEmail: string;
  referredName: string | null;
  status: string;
  createdAt: string;
};

export default function AdminReferrals() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchReferrals();
  }, []);

  async function fetchReferrals() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/referrals");
      const data = await res.json();
      setReferrals(data);
    } catch (err) {
      console.error("Error loading referrals:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const filteredReferrals = referrals.filter(r =>
    r.referredEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.referredName && r.referredName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#231f20] tracking-tight">Gestion des Recommandations</h1>
          <p className="text-slate-500">Analysez la croissance organique et récompensez vos ambassadeurs.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[#ee0c5d] bg-white"
            placeholder="Rechercher un contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-wider font-bold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Contact Référé</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={4} className="px-6 py-20 text-center text-slate-400">Chargement des données...</td></tr>
              ) : referrals.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-20 text-center text-slate-400">Aucune recommandation trouvée.</td></tr>
              ) : (
                filteredReferrals.map((ref) => (
                  <tr key={ref.id} className="hover:bg-slate-50/80 transition-all group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-sm">{ref.referredName || "Anonyme"}</span>
                        <span className="text-xs text-slate-500">{ref.referredEmail}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${
                        ref.status === "CONVERTED" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-600 border-slate-100"
                      }`}>
                        {ref.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(ref.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" className="p-2 text-slate-400 hover:text-[#ee0c5d]">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Stats / Leaderboard */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <h2 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#ee0c5d]" />
              Top Ambassadeurs
            </h2>
            <div className="space-y-4">
              {/* Static mockup for now, can be replaced by aggregate query */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                      {i}
                    </div>
                    <span className="text-sm font-medium text-slate-700">Utilisateur {i}</span>
                  </div>
                  <span className="text-xs font-bold text-[#ee0c5d]">{10 - i} referrals</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
