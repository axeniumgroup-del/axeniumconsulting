"use client";

import React from "react";
import { motion } from "framer-motion";
import { ConciergeChat } from "@/components/client/ConciergeChat";
import { Calendar, Zap, Star, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClientPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#ee0c5d]/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Left Section: Value Prop & Booking */}
          <div className="flex-grow space-y-12 w-full lg:w-1/2">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-slate-300 backdrop-blur-md">
                <Sparkles className="w-3 h-3 text-[#ee0c5d]" />
                <span>Expérience Concierge Premium</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Optimisez votre <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ee0c5d] to-indigo-400">
                  Performance Business
                </span>
              </h1>
              <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
                L'excellence opérationnelle à portée de clic. Discutez avec notre IA pour qualifier vos besoins et réservez un diagnostic stratégique avec nos experts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all group cursor-pointer">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#ee0c5d]/20 transition-colors">
                  <ShieldCheck className="text-white w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">Audit de Sécurité</h3>
                <p className="text-slate-400 text-sm mb-4">Analyse complète de vos vulnérabilités critiques.</p>
                <div className="flex items-center gap-2 text-[#ee0c5d] text-xs font-bold uppercase tracking-wider">
                  En savoir plus <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all group cursor-pointer">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                  <Zap className="text-white w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">Accélération Digitale</h3>
                <p className="text-slate-400 text-sm mb-4">Optimisation de vos flux de travail et automatisation.</p>
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                  En savoir plus <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#ee0c5d] to-indigo-600 shadow-2xl shadow-[#ee0c5d]/20 relative overflow-hidden group">
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-white mb-2">Prêt pour la suite ?</h2>
                  <p className="text-white/80 text-sm">Réservez votre consultation stratégique gratuite.</p>
                </div>
                <Button className="bg-white text-[#ee0c5d] hover:bg-slate-100 px-8 py-6 rounded-2xl font-bold text-base shadow-xl transition-all hover:scale-105">
                  <Calendar className="w-5 h-5 mr-2" />
                  Prendre RDV
                </Button>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            </div>
          </div>

          {/* Right Section: The AI Concierge */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full max-w-[500px] relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#ee0c5d] via-indigo-500 to-purple-600 rounded-[32px] blur-2xl opacity-30 animate-pulse" />
              <ConciergeChat />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
