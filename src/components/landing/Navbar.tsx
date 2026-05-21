"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
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