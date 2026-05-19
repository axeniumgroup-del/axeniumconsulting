"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  ChevronRight,
  Building2,
  Cpu,
  Rss,
  ArrowUpRight,
  CheckCircle2,
  Menu,
  X,
  ShieldCheck
} from 'lucide-react';

/**
 * AXENIUM - BOLD LUXURY DESIGN
 * Primary: #ee0c5d (Vibrant Red), #231f20 (Deep Charcoal)
 * Secondary: White, Metallic Grey
 */

const SERVICES = [
  {
    id: 'btp',
    title: 'Expertise BTP',
    subtitle: 'Ingénierie et Conseil Bâtiment',
    description: 'Optimisation des infrastructures, gestion de projets complexes et audit de conformité pour les grands chantiers de la sous-région.',
    icon: Building2,
    color: 'bg-[#231f20]',
    whatsappMsg: 'Bonjour Axenium, je souhaite obtenir un conseil expert pour un projet BTP.',
    features: ['Audit technique', 'Gestion de projet', 'Optimisation coûts']
  },
  {
    id: 'it',
    title: 'Solutions IT',
    subtitle: 'Transformation Numérique',
    description: 'Architecture système, déploiement de solutions Cloud et stratégie de digitalisation pour entreprises en croissance.',
    icon: Cpu,
    color: 'bg-[#ee0c5d]',
    whatsappMsg: 'Bonjour Axenium, je souhaite discuter de la transformation digitale de mon entreprise.',
    features: ['Audit Infrastructure', 'Cloud Strategy', 'Sécurité Systèmes']
  },
  {
    id: 'telecom',
    title: 'Télécommunications',
    subtitle: 'Connectivité & Réseaux',
    description: 'Déploiement de réseaux critiques, optimisation de la connectivité et conseil en infrastructures télécoms.',
    icon: Rss,
    color: 'bg-[#231f20]',
    whatsappMsg: 'Bonjour Axenium, je souhaite optimiser mes infrastructures Télécoms.',
    features: ['Audit Réseau', 'Interconnexion', 'Optimisation Flux']
  }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed w-full z-50 px-6 py-4 flex justify-between items-center bg-white/95 backdrop-blur-md border-b border-slate-200">
      <motion.a
        href="#accueil"
        className="flex items-center gap-2 cursor-pointer"
        whileHover={{ scale: 1.05 }}
      >
        <Image
          src="/logo.png"
          alt="Axenium Logo"
          width={80}
          height={80}
          className="object-contain"
        />
      </motion.a>

      <div className="hidden md:flex gap-8 items-center">
        {['Accueil', 'Expertises', 'Approche', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold text-slate-500 hover:text-[#ee0c5d] transition-colors uppercase tracking-wider">
            {item}
          </a>
        ))}
        <a href="#contact" className="px-6 py-2 bg-[#ee0c5d] text-white text-sm font-bold rounded-full hover:bg-[#d10a52] transition-all shadow-lg shadow-[#ee0c5d]/20">
          Consultation Gratuite
        </a>
      </div>

      <button className="md:hidden p-2 text-[#231f20]" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-slate-200 p-6 flex flex-col gap-4 md:hidden"
          >
            {['Accueil', 'Expertises', 'Approche', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-lg font-bold text-slate-600 hover:text-[#ee0c5d]">
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section id="accueil" className="relative min-h-screen flex items-center px-6 pt-20 overflow-hidden bg-white">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-100 -z-10 skew-x-[-12deg] translate-x-20" />

    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#ee0c5d]/10 text-[#ee0c5d] text-xs font-bold mb-6 border border-[#ee0c5d]/20">
          <ShieldCheck size={14} /> Expert Conseil Afrique Francophone
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-[#231f20] leading-tight tracking-tighter mb-6">
          L'Excellence <span className="text-[#ee0c5d]">Opérationnelle</span> pour vos Infrastructures.
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
          Axenium transforme vos défis techniques en leviers de croissance via un conseil stratégique d'élite en BTP, IT et Télécoms.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
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
        className="relative"
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
        <div className="absolute -bottom-6 -left-6 p-6 bg-white shadow-2xl rounded-2xl border-l-4 border-[#ee0c5d] max-w-xs">
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

const ExpertiseGrid = () => {
  return (
    <section id="expertises" className="py-24 px-6 bg-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-[#231f20] tracking-tight mb-4">Nos Domaines d'Intervention</h2>
          <div className="h-1.5 w-24 bg-[#ee0c5d] mx-auto mb-6" />
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            L'élite du conseil multidisciplinaire pour sécuriser et optimiser vos actifs critiques.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-[#ee0c5d] transition-all hover:shadow-2xl flex flex-col h-full"
            >
              <div className={`w-14 h-14 ${service.color} text-white rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform`}>
                <service.icon size={28} />
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
              <WhatsAppButton message={service.whatsappMsg} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhatsAppButton = ({ message }) => {
  const trackClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'whatsapp_click', {
        'event_category': 'Conversion',
        'event_label': message.substring(0, 30)
      });
    }
  };

  const encodedMsg = encodeURIComponent(message);
  const phone = "237600000000";

  return (
    <a
      href={`https://wa.me/${phone}?text=${encodedMsg}`}
      onClick={trackClick}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full py-4 bg-[#231f20] text-white text-sm font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-[#ee0c5d] transition-all group"
    >
      <MessageCircle size={18} />
      Demander un conseil expert
      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
    </a>
  );
};

const FloatingWhatsApp = () => {
  const [activeSection, setActiveSection] = useState('accueil');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const messages = {
    accueil: 'Bonjour Axenium, je souhaite en savoir plus sur vos services de conseil.',
    expertises: 'Bonjour Axenium, je souhaite discuter d\'une de vos expertises spécifiques.',
    contact: 'Bonjour Axenium, je souhaite prendre rendez-vous pour une consultation.',
  };

  const currentMsg = messages[activeSection] || messages.accueil;
  const phone = "237600000000";

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.a
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href={`https://wa.me/${phone}?text=${encodeURIComponent(currentMsg)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-green-600 transition-colors group"
      >
        <MessageCircle size={28} />
        <span className="absolute right-full mr-4 bg-white text-[#231f20] text-xs font-bold px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap border border-slate-100">
          Besoin d'un expert ?
        </span>
      </motion.a>
    </div>
  );
};

const Footer = () => (
  <footer id="contact" className="py-20 px-6 bg-[#231f20] text-white">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <div>
        <h2 className="text-4xl font-black mb-6 tracking-tighter leading-tight">Prêt à optimiser vos <span className="text-[#ee0c5d]">opérations</span> ?</h2>
        <p className="text-slate-400 mb-10 text-lg max-w-md leading-relaxed">
          Ne laissez pas vos infrastructures limiter votre croissance. Contactez Axenium pour un audit stratégique.
        </p>
        <div className="flex gap-6">
          <div className="text-center">
            <div className="text-3xl font-black text-[#ee0c5d]">100%</div>
            <div className="text-xs text-slate-500 uppercase font-bold tracking-widest">Confidentialité</div>
          </div>
          <div className="w-px h-12 bg-slate-700" />
          <div className="text-center">
            <div className="text-3xl font-black text-[#ee0c5d]">Expert</div>
            <div className="text-xs text-slate-500 uppercase font-bold tracking-widest">Afrique Francophone</div>
          </div>
        </div>
      </div>
      <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#ee0c5d]/10 rounded-full blur-3xl" />
        <div className="text-center mb-8 relative z-10">
          <h3 className="text-xl font-bold mb-2">Consultation Rapide</h3>
          <p className="text-slate-400 text-sm">Réponse sous 24h via WhatsApp</p>
        </div>
        <WhatsAppButton message="Bonjour Axenium, je souhaite planifier une consultation stratégique." />
      </div>
    </div>
    <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
      <p>© 2026 AXENIUM GROUP. Tous droits réservés.</p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-[#ee0c5d] transition-colors">Mentions Légales</a>
        <a href="#" className="hover:text-[#ee0c5d] transition-colors">Politique de Confidentialité</a>
      </div>
    </div>
  </footer>
);

export default function AxeniumSite() {
  return (
    <div className="min-h-screen font-sans text-[#231f20] selection:bg-[#ee0c5d] selection:text-white">
      <Navbar />
      <Hero />
      <ExpertiseGrid />

      <section id="approche" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
             <div className="absolute -top-4 -left-4 w-full h-full border-2 border-slate-200 rounded-2xl" />
             <img
               src="/DG.png"
               alt="DG Axenium"
               className="rounded-2xl shadow-xl relative z-10"
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
      <FloatingWhatsApp />
    </div>
  );
}
