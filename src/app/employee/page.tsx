"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  User,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowUpRight,
  MoreVertical,
  Search,
  BellRing,
  Save,
  MessageSquare,
  X,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Lead = {
  id: string;
  status: string;
  client: { name: string; email: string; phoneNumber: string };
  operationalNotes: string;
  value: number;
};

export default function EmployeeHub() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);
  const [editingLead, setEditingLead] = useState<{ id: string; notes: string } | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    loadLeads();
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        triggerAlert("Nouveau lead assigné !");
      }
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const triggerAlert = (msg: string) => {
    setNotification(msg);
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2358/sfx-notification-light-ding.wav");
    audio.play().catch(() => console.log("Audio play blocked"));
    setTimeout(() => setNotification(null), 5000);
  };

  async function loadLeads() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/employee/leads");
      const data = await res.json();
      setLeads(data);
    } catch (error) {
      console.error("Error loading leads:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleUpdateNotes = async () => {
    if (!editingLead) return;
    setSaveLoading(true);
    try {
      const res = await fetch("/api/employee/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingLead.id,
          operationalNotes: editingLead.notes,
        }),
      });
      if (res.ok) {
        await loadLeads();
        setEditingLead(null);
      }
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#ee0c5d] text-white rounded-2xl shadow-2xl border border-white/20"
          >
            <BellRing className="w-5 h-5 animate-bounce" />
            <span className="font-bold text-sm">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-[#231f20] tracking-tight">Mon Hub Opérationnel</h1>
        <p className="text-slate-500">Gérez vos leads et optimisez vos conversions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#ee0c5d]" />
                Mon Pipeline de Conversion
              </h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-[#ee0c5d]"
                  placeholder="Rechercher un lead..."
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-wider font-bold">
                  <tr>
                    <th className="px-6 py-3">Client</th>
                    <th className="px-6 py-3">Statut</th>
                    <th className="px-6 py-3">Valeur</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {isLoading ? (
                    <tr><td colSpan={4} className="px-6 py-10 text-center text-slate-400">Chargement...</td></tr>
                  ) : leads.length === 0 ? (
                    <tr><td colSpan={4} className="px-6 py-10 text-center text-slate-400">Aucun lead assigné pour le moment.</td></tr>
                  ) : (
                    leads.map(lead => (
                      <tr key={lead.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900 text-sm">{lead.client.name}</span>
                            <span className="text-xs text-slate-500">{lead.client.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${
                            lead.status === "NEW" ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-yellow-50 text-yellow-600 border-yellow-100"
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-900 text-sm">
                          {lead.value?.toLocaleString()} FCFA
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button
                            onClick={() => setEditingLead({ id: lead.id, notes: lead.operationalNotes || "" })}
                            className="px-3 py-1 text-[10px] bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                          >
                            Suivi
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {editingLead && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-3xl border-2 border-[#ee0c5d] shadow-xl space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#ee0c5d]" />
                  Mise à jour du suivi opérationnel
                </h3>
                <button onClick={() => setEditingLead(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <textarea
                className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#ee0c5d] text-sm"
                rows={4}
                value={editingLead.notes}
                onChange={(e) => setEditingLead({ ...editingLead, notes: e.target.value })}
                placeholder="Saisissez vos notes de suivi ici..."
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleUpdateNotes}
                  disabled={saveLoading}
                  className="px-6 py-2 bg-[#ee0c5d] hover:bg-[#d10a52] text-white font-bold rounded-xl flex items-center gap-2"
                >
                  {saveLoading ? "..." : <><Save className="w-4 h-4" /> Sauvegarder</>}
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <h2 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#ee0c5d]" />
              Mes Priorités
            </h2>
            <div className="space-y-4">
              {leads.filter(l => l.status === "NEW").map(lead => (
                <div key={lead.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-rose-500 uppercase">Urgent</span>
                    <span className="text-[10px] text-slate-400">Nouveau</span>
                  </div>
                  <p className="text-sm font-medium text-slate-700 group-hover:text-[#ee0c5d] transition-colors">
                    Contacter {lead.client.name}
                  </p>
                </div>
              ))}
              {leads.filter(l => l.status === "NEW").length === 0 && (
                <p className="text-xs text-slate-400 text-center py-4">Aucune priorité urgente.</p>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#ee0c5d] to-indigo-600 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <h3 className="font-bold">Performance</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Taux de closing</span>
                <span className="font-bold">65%</span>
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white w-[65%] rounded-full" />
              </div>
              <p className="text-[10px] text-white/60 italic">
                "Gemma analyse vos leads : 3 opportunités à fort potentiel détectées."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
