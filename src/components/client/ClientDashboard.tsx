"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Zap, ShieldCheck, ArrowRight, Sparkles, User, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConciergeChat } from "@/components/client/ConciergeChat";

interface ClientDashboardProps {
  session: any;
}

export function ClientDashboard({ session }: ClientDashboardProps) {
  const userName = session?.user?.name || "Client";

  return (
    <div className="min-h-screen bg-[#0f172a] text-white overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#ee0c5d]/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Main Content Section */}
          <div className="flex-grow space-y-12 w-full lg:w-2/3">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-slate-300 backdrop-blur-md">
                <Sparkles className="w-3 h-3 text-[#ee0c5d]" />
                <span className="uppercase tracking-wider">Espace Personnel</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-tight">
                Bienvenue, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ee0c5d] to-indigo-400">{userName}</span>
              </h1>
              <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
                Votre cockpit de performance business. Gérez vos audits, suivez vos optimisations et interagissez avec vos experts Axenium en temps réel.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all group cursor-pointer">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#ee0c5d]/20 transition-colors">
                  <ShieldCheck className="text-white w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">Audit de Sécurité</h3>
                <p className="text-slate-400 text-sm mb-4">Analyse complète de vos vulnérabilités critiques et recommandations stratégiques.</p>
                <div className="flex items-center gap-2 text-[#ee0c5d] text-xs font-bold uppercase tracking-wider">
                  En savoir plus <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all group cursor-pointer">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                  <Zap className="text-white w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">Accélération Digitale</h3>
                <p className="text-slate-400 text-sm mb-4">Optimisation de vos flux de travail et déploiement d'automatisations intelligentes.</p>
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                  En savoir plus <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#ee0c5d] to-indigo-600 shadow-2xl shadow-[#ee0c5d]/20 relative overflow-hidden group">
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-white mb-2">Besoin d'un diagnostic ?</h2>
                  <p className="text-white/80 text-sm">Réservez votre consultation stratégique gratuite avec nos experts.</p>
                </div>
                <Button className="bg-white text-[#ee0c5d] hover:bg-slate-100 px-8 py-6 rounded-2xl font-bold text-base shadow-xl transition-all hover:scale-105">
                  <Calendar className="w-5 h-5 mr-2" />
                  Prendre RDV
                </Button>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            </div>
          </div>

          {/* Right Section: User Context Window & AI Concierge */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">

            {/* Context Window */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <User size={18} className="text-[#ee0c5d]" />
                  Votre Contexte
                </h3>
                <span className="text-[10px] bg-white/10 text-slate-400 px-2 py-0.5 rounded-full uppercase font-bold">Premium</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className={`p-2 rounded-lg ${session?.user?.email ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Email lié</p>
                    <p className="text-sm font-medium text-white">{session?.user?.email || "Non renseigné"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className={`p-2 rounded-lg ${session?.user?.phoneNumber ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">WhatsApp</p>
                    <p className="text-sm font-medium text-white">{session?.user?.phoneNumber || "Non renseigné"}</p>
                  </div>
                </div>

                {!session?.user?.email || !session?.user?.phoneNumber ? (
                  <div className="p-4 rounded-2xl bg-[#ee0c5d]/10 border border-[#ee0c5d]/20 flex gap-3">
                    <AlertCircle className="text-[#ee0c5d] shrink-0" size={18} />
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Profil incomplet. Complétez vos informations dans vos <a href="/client/settings" className="text-[#ee0c5d] font-bold hover:underline">préférences</a> pour débloquer le suivi prioritaire.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 flex gap-3">
                    <CheckCircle2 className="text-green-400 shrink-0" size={18} />
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Profil vérifié. Vous bénéficiez désormais de l'accès complet aux services Axenium.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* AI Concierge */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#ee0c5d] via-indigo-500 to-purple-600 rounded-[32px] blur-2xl opacity-30 animate-pulse" />
              <div className="relative z-10">
                <ConciergeChat />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
