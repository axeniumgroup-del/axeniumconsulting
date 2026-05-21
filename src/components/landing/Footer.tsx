"use client";

import React from 'react';
import { WhatsAppButton } from './WhatsAppButton';

export const Footer = () => (
  <footer id="contact" className="py-20 px-6 bg-[#231f20] text-white">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <div className="space-y-6">
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
    <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col items-center gap-6 text-slate-500 text-xs text-center">
      <div className="flex gap-4 justify-center">
        <a href="https://www.facebook.com/axeniumgroup" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:bg-[#1877F2] hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg" aria-label="Facebook">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.951 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.535 3.47h-2.793v8.385C19.612 23.051 24 18.09 24 12.073z"/></svg>
        </a>
        <a href="https://www.linkedin.com/company/axeniumgroup" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:bg-[#0077B5] hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg" aria-label="LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-0.79-1.75-1.76 0-0.97 0.784-1.76 1.75-1.76s1.76 0.79 1.76 1.76c0 0.97-0.784 1.76-1.76 1.76zm-4.5 1.268h-2.5v11h2.5v-11z"/></svg>
        </a>
        <a href="https://www.instagram.com/axeniumgroup/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg" aria-label="Instagram">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.857.07 1.13.054 2.137.247 2.624.443.63.253 1.22.626 1.753 1.259.533.633.906 1.224 1.259 1.753.196.487.389 1.494.443 2.624.058 1.273.07 1.653.07 4.857s-.012 3.584-.07 4.857c-.054 1.13-.247 2.137-.443 2.624-.253.63-.626 1.224-1.259 1.753-.633.533-1.224.906-1.753 1.259-.487.196-1.494.389-2.624.443-1.273.058-1.653.07-4.857.07s-3.584-.012-4.857-.07c-1.13-.054-2.137-.247-2.624-.443-.63-.253-1.22-.626-1.753-1.259-.533-.633-.906-1.224-1.259-1.753-.196-.487-.389-1.494-.443-2.624-.058-1.273-.07-1.653-.07-4.857s.012-3.584.07-4.857c.054-1.13.247-2.137.443-2.624.253-.63.626-1.224 1.259-1.753.633-.533 1.224-.906 1.753-1.259.487-.196 1.494-.389 2.624-.443 1.273-.058 1.653.07-4.857.07z M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.84a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
        </a>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full max-w-4xl">
        <p>© 2026 AXENIUM GROUP. Tous droits réservés.</p>
        <div className="flex gap-6">
          <a href="/mentions-legales" className="hover:text-[#ee0c5d] transition-colors">Mentions Légales</a>
          <a href="/politique-confidentialite" className="hover:text-[#ee0c5d] transition-colors">Politique de Confidentialité</a>
        </div>
      </div>
    </div>
  </footer>
);
