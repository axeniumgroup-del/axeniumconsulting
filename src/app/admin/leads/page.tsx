"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, User, UserCheck, Filter, MoreHorizontal, DollarSign, X } from "lucide-react";

type Lead = {
  id: string;
  status: string;
  value: number;
  notes: string;
  clientId: string;
  employeeId: string | null;
  client: { name: string; email: string; phoneNumber: string };
  assignedTo: { name: string; email: string } | null;
};

type Employee = {
  id: string;
  name: string;
  email: string;
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [formData, setFormData] = useState({
    clientId: "",
    employeeId: "",
    status: "NEW",
    value: "",
    notes: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      const [leadsRes, empRes] = await Promise.all([
        fetch("/api/admin/leads"),
        fetch("/api/admin/employees"),
      ]);
      const leadsData = await leadsRes.json();
      const empData = await empRes.json();
      setLeads(leadsData);
      setEmployees(empData);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSaveLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const method = editingLead ? "PATCH" : "POST";
      const url = "/api/admin/leads";
      const body = {
        ...(editingLead && { id: editingLead.id }),
        clientId: formData.clientId,
        employeeId: formData.employeeId,
        status: formData.status,
        value: formData.value,
        notes: formData.notes,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setEditingLead(null);
        setFormData({ clientId: "", employeeId: "", status: "NEW", value: "", notes: "" });
        await loadData();
      }
    } catch (error) {
      console.error("Error saving lead:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (lead: Lead) => {
    setEditingLead(lead);
    setFormData({
      clientId: lead.clientId,
      employeeId: lead.employeeId || "",
      status: lead.status,
      value: lead.value?.toString() || "",
      notes: lead.notes || "",
    });
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW": return "bg-blue-100 text-blue-700 border-blue-200";
      case "CONTACTED": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "QUALIFIED": return "bg-purple-100 text-purple-700 border-purple-200";
      case "NEGOTIATION": return "bg-orange-100 text-orange-700 border-orange-200";
      case "CLOSED_WON": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "CLOSED_LOST": return "bg-rose-100 text-rose-700 border-rose-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#231f20]">Gestion des Leads</h1>
          <p className="text-slate-500 text-sm">Affectez et suivez vos opportunités business</p>
        </div>
        <Button
          onClick={() => { setEditingLead(null); setFormData({ clientId: "", employeeId: "", status: "NEW", value: "", notes: "" }); setIsModalOpen(true); }}
          className="flex items-center gap-2 py-6"
        >
          <Plus className="w-4 h-4" /> Nouveau Lead
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[#ee0c5d]"
                placeholder="Filtrer les leads..."
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4 border-b border-slate-100">Client</th>
                <th className="px-6 py-4 border-b border-slate-100">Statut</th>
                <th className="px-6 py-4 border-b border-slate-100">Assigné à</th>
                <th className="px-6 py-4 border-b border-slate-100">Valeur</th>
                <th className="px-6 py-4 border-b border-slate-100 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {isLoading && leads.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-slate-400">Chargement...</td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-slate-400">Aucun lead trouvé.</td></tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 border-b border-slate-100">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{lead.client.name || "Inconnu"}</span>
                        <span className="text-xs text-slate-500">{lead.client.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-b border-slate-100">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">{lead.assignedTo?.name || "Non assigné"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-b border-slate-100">
                      <div className="flex items-center gap-1 font-medium text-slate-900">
                        <DollarSign className="w-3 h-3 text-slate-400" />
                        {lead.value?.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 border-b border-slate-100 text-right">
                      <Button
                        onClick={() => openEditModal(lead)}
                        className="px-3 py-1 text-xs bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                      >
                        Modifier
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900">{editingLead ? "Modifier le Lead" : "Nouveau Lead"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveLead} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Client ID</label>
                  <input
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-[#ee0c5d]"
                    value={formData.clientId}
                    onChange={e => setFormData({...formData, clientId: e.target.value})}
                    placeholder="ID du client"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Assigner à</label>
                  <select
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-[#ee0c5d]"
                    value={formData.employeeId}
                    onChange={e => setFormData({...formData, employeeId: e.target.value})}
                  >
                    <option value="">Non assigné</option>
                    {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Statut</label>
                  <select
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-[#ee0c5d]"
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="NEW">Nouveau</option>
                    <option value="CONTACTED">Contacté</option>
                    <option value="QUALIFIED">Qualifié</option>
                    <option value="NEGOTIATION">Négociation</option>
                    <option value="CLOSED_WON">Gagné</option>
                    <option value="CLOSED_LOST">Perdu</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Valeur Estimée (FCFA)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-[#ee0c5d]"
                    value={formData.value}
                    onChange={e => setFormData({...formData, value: e.target.value})}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Notes de suivi</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-[#ee0c5d]"
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                  placeholder="Détails sur l'opportunité..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="flex-1 py-3"
                  disabled={isLoading}
                >
                  {isLoading ? "Enregistrement..." : "Enregistrer"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
