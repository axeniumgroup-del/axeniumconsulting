"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { Hero } from '@/components/landing/Hero';
import { ExpertiseGrid } from '@/components/landing/ExpertiseGrid';
import { Footer } from '@/components/landing/Footer';

export function HomeContent() {
  return (
    <div className="min-h-screen font-sans text-[#231f20] selection:bg-[#ee0c5d] selection:text-white">
      <Hero />
      <ExpertiseGrid />

      <section id="approche" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[400px] w-full max-w-md mx-auto">
             <div className="absolute -top-4 -left-4 w-full h-full border-2 border-slate-200 rounded-2xl" />
             <Image
               src="/DG.png"
               alt="DG Axenium"
               fill
               className="rounded-2xl shadow-xl relative z-10 object-cover"
             />
          </div>
          <div>
            <h2 className="text-3xl font-black mb-6 tracking-tight">Notre Approche : <span className="text-[#ee0c5d]">Rigueur & Résilience</span></h2>
            <div className="space-y-6">
              {[
                { t: 'Analyse Prédictive', d: 'Nous anticipons les risques infrastructurels avant qu’ils n’impactent votre rentabilité.' },
                { t: 'Souveraineté Numérique', d: 'Des solutions conçues pour le contexte spécifique des marchés africains.' },
                { t: 'Accompagnement End-to-End', d: 'De l\'audit initial à l\'exécution opérationnelle sur le terrain.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="flex gap-4"
                >
                  <div className="mt-1 p-1 bg-[#ee0c5d] text-white rounded-full"><CheckCircle2 size={14} /></div>
                  <div>
                    <h4 className="font-bold text-[#231f20]">{item.t}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
