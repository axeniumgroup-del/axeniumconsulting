"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const Hero = () => (
  <section id="accueil" className="relative min-h-screen flex items-center px-6 pt-24 pb-12 md:pt-20 overflow-hidden bg-white">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-100 -z-10 skew-x-[-12deg] translate-x-20" />

    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center md:text-left"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#ee0c5d]/10 text-[#ee0c5d] text-xs font-bold mb-6 border border-[#ee0c5d]/20">
          <ShieldCheck size={14} /> Expert Conseil Afrique Francophone
        </div>
        <h1 className="text-4xl md:text-7xl font-black text-[#231f20] leading-tight tracking-tighter mb-6">
          L'Excellence <span className="text-[#ee0c5d]">Opérationnelle</span> pour vos Infrastructures.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed mx-auto md:mx-0">
          Axenium transforme vos défis techniques en leviers de croissance via un conseil stratégique d'élite en BTP, IT et Télécoms.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a href="#expertises" className="px-8 py-4 bg-[#231f20] text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-[#3d3a39] transition-all group shadow-xl shadow-[#231f20]/30">
            Nos expertises <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          <a href="#contact" className="px-8 py-4 border-2 border-[#231f20] text-[#231f20] font-bold rounded-lg hover:bg-slate-50 transition-all text-center">
            Nous contacter
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-md mx-auto md:max-w-none"
      >
        <div className="aspect-square bg-[#231f20] rounded-3xl shadow-2xl overflow-hidden relative border-4 border-[#ee0c5d]/20">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="absolute inset-0 flex items-center justify-center p-12">
             <div className="text-white text-center space-y-6">
                <Image src="/logo.png" alt="Axenium" width={200} height={200} className="mx-auto brightness-0 invert" />
                <div className="h-1 w-24 bg-[#ee0c5d] mx-auto" />
                <p className="text-slate-400 font-medium italic tracking-widest uppercase text-sm">Précision. Stratégie. Résilience.</p>
             </div>
          </div>
        </div>
        <div className="absolute -bottom-6 -left-6 p-6 bg-white shadow-2xl rounded-2xl border-l-4 border-[#ee0c5d] max-w-xs hidden sm:block">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-2 bg-[#ee0c5d]/10 text-[#ee0c5d] rounded-full"><CheckCircle2 size={20} /></div>
            <span className="font-bold text-[#231f20]">Audit Validé</span>
          </div>
          <p className="text-sm text-slate-500 italic">"Une approche rigoureuse qui a transformé notre déploiement réseau."</p>
        </div>
      </motion.div>
    </div>
  </section>
);