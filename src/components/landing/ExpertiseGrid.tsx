"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Cpu, Rss, Sprout, Factory, Leaf } from 'lucide-react';
import { SERVICES } from './constants';
import { WhatsAppButton } from './WhatsAppButton';
import Link from 'next/link';

const iconMap = {
  Building2: Building2,
  Cpu: Cpu,
  Rss: Rss,
  Sprout: Sprout,
  Factory: Factory,
  Leaf: Leaf,
};

export const ExpertiseGrid = () => {
  return (
    <section id="expertises" className="py-24 px-6 bg-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-[#231f20] tracking-tight mb-4">Nos Domaines d'Expertise</h2>
          <div className="h-1.5 w-24 bg-[#ee0c5d] mx-auto mb-6" />
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Accédez aux meilleurs consultants indépendants pour sécuriser et optimiser vos actifs critiques.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-[#ee0c5d] transition-all hover:shadow-2xl flex flex-col h-full"
              >
                <div className={`w-14 h-14 ${service.color} text-white rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-[#231f20] mb-2">{service.title}</h3>
                <p className="text-xs font-bold text-[#ee0c5d] mb-4 uppercase tracking-widest">{service.subtitle}</p>
                <p className="text-slate-600 mb-8 flex-grow leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                      <div className="w-1.5 h-1.5 bg-[#ee0c5d] rounded-full" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-3">
                  <Link
                    href={`/services/${service.id}`}
                    className="text-center text-sm font-bold text-slate-400 hover:text-[#ee0c5d] transition-colors mb-2"
                  >
                    En savoir plus →
                  </Link>
                  <WhatsAppButton message={service.whatsappMsg} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};