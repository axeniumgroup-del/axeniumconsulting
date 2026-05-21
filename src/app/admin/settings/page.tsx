"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Bell, ShieldCheck, Save, CheckCircle } from "lucide-react";

export default function AdminSettings() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      setPhoneNumber(data.adminPhoneNumber);
    } catch (error) {
      console.error("Error loading settings:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSave = async () => {
    setIsLoading(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminPhoneNumber: phoneNumber }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-[#231f20] tracking-tight">Paramètres du Système</h1>
        <p className="text-slate-500">Configurez les paramètres globaux d'Axenium et les canaux de notification.</p>
      </div>

      <div className="max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
          <SettingsIcon className="w-5 h-5 text-slate-400" />
          <h2 className="font-bold text-slate-900">Configuration des Notifications</h2>
        </div>

        <div className="p-8 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 block">Numéro WhatsApp du Super Admin</label>
                <p className="text-xs text-slate-500">Toutes les notifications d'inscription et d'alerte seront envoyées à ce numéro.</p>
              </div>
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Bell className="w-5 h-5" />
              </div>
            </div>

            <div className="flex gap-3">
              <div className="relative flex-grow">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <input
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#ee0c5d] text-slate-900 font-medium"
                  placeholder="+237 ..."
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="px-6 py-3 bg-[#ee0c5d] hover:bg-[#d10a52] text-white font-bold rounded-xl shadow-lg shadow-[#ee0c5d]/20 transition-all"
              >
                {isLoading ? "..." : saved ? <CheckCircle className="w-5 h-5" /> : <Save className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 rounded-3xl p-6 border border-indigo-100 flex gap-4">
        <div className="p-3 bg-indigo-600 rounded-2xl text-white">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-indigo-900">Sécurisation des Données</h4>
          <p className="text-sm text-indigo-700/70"> la configuration du numéro administrateur est chiffrée et accessible uniquement via le rôle Super Admin.</p>
        </div>
      </div>
    </div>
  );
}
