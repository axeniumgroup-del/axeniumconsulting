"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  UserCheck,
  UserMinus,
  ShieldAlert,
  FileText,
  ExternalLink,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Key
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type UserProfile = {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  isValidated: boolean;
  cvUrl: string | null;
  _count: {
    assignedLeads: number;
  };
};

export default function UserManagement() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const toggleValidation = async (userId: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, isValidated: !currentStatus }),
      });
      if (res.ok) fetchUsers();
    } catch (error) {
      console.error("Error updating validation:", error);
    }
  };

  const toggleCVUpload = async (userId: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, canUploadCV: !currentStatus }),
      });
      if (res.ok) fetchUsers();
    } catch (error) {
      console.error("Error updating CV upload permission:", error);
    }
  };

  const updateRole = async (userId: string, newRole: string) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });
      if (res.ok) fetchUsers();
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const sendResetLink = async (userId: string) => {
    try {
      const res = await fetch("/api/admin/generate-reset-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (res.ok) {
        alert("Lien de réinitialisation envoyé avec succès !");
      } else {
        const data = await res.json();
        alert("Erreur: " + data.message);
      }
    } catch (error) {
      console.error("Error sending reset link:", error);
      alert("Une erreur est survenue lors de l'envoi du lien.");
    }
  };

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#231f20] tracking-tight">Gestion des Ressources</h1>
          <p className="text-slate-500">Pilotez vos talents et validez les accès à l'écosystème.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[#ee0c5d] bg-white"
              placeholder="Rechercher un consultant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-wider font-bold border-b border-slate-100">
                <th className="px-6 py-4">Consultant / Utilisateur</th>
                <th className="px-6 py-4">Rôle Actuel</th>
                <th className="px-6 py-4">Charge de Travail</th>
                <th className="px-6 py-4">Statut CV</th>
                <th className="px-6 py-4 text-right">Actions Manageriales</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-20 text-center text-slate-400">Analyse des ressources en cours...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-20 text-center text-slate-400">Aucune ressource détectée.</td></tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-all group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden">
                          <img src={`https://ui-avatars.com/api/?name=${user.name || 'User'}&background=ee0c5d&color=fff`} alt={user.name || "User"} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 text-sm">{user.name || "Utilisateur anonyme"}</span>
                          <span className="text-xs text-slate-500">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) => updateRole(user.id, e.target.value)}
                        className={`px-2 py-1 rounded-lg text-[11px] font-bold border outline-none transition-all ${
                          user.role === 'ADMIN' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                          user.role === 'EMPLOYEE' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                          'bg-slate-50 text-slate-600 border-slate-100'
                        }`}
                      >
                        <option value="CLIENT">CLIENT</option>
                        <option value="EMPLOYEE">EMPLOYEE</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-slate-700">{user._count.assignedLeads} Leads</span>
                          {user._count.assignedLeads > 5 && (
                            <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-600 text-[9px] font-bold">Saturé</span>
                          )}
                        </div>
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${user._count.assignedLeads > 5 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                            style={{ width: `${Math.min((user._count.assignedLeads / 5) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleValidation(user.id, user.isValidated)}
                          className={`p-2 rounded-lg transition-colors ${
                            user.isValidated ? "text-emerald-500 bg-emerald-50 hover:bg-emerald-100" : "text-slate-400 bg-slate-100 hover:bg-slate-200"
                          }`}
                          title="Valider le compte"
                        >
                          {user.isValidated ? <CheckCircle className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => toggleCVUpload((user as any).id, (user as any).canUploadCV)}
                          className={`p-2 rounded-lg transition-colors ${
                            (user as any).canUploadCV ? "text-indigo-500 bg-indigo-50 hover:bg-indigo-100" : "text-slate-400 bg-slate-100 hover:bg-slate-200"
                          }`}
                          title="Activer l'upload du CV"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        {user.cvUrl && (
                          <a href={user.cvUrl} target="_blank" className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={() => sendResetLink(user.id)}
                          className="p-2 text-slate-400 hover:text-[#ee0c5d] transition-colors"
                          title="Envoyer lien de reset"
                          variant="ghost"
                        >
                          <Key className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                        >
                          <UserMinus className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
