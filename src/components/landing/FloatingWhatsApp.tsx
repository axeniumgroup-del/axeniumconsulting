"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp = () => {
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

  const currentMsg = messages[activeSection as keyof typeof messages] || messages.accueil;
  const phone = "237622147618";

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.a
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href={`https://wa.me/${phone}?text=${encodeURIComponent(currentMsg)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#231f20] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#3d3a39] transition-colors group"
      >
        <MessageCircle size={28} />
        <span className="absolute right-full mr-4 bg-white text-[#231f20] text-xs font-bold px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap border border-slate-100 pointer-events-none">
          Besoin d'un expert ?
        </span>
      </motion.a>
    </div>
  );
};