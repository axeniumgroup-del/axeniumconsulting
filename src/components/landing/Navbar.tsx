"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Expertises', href: '/#expertises' },
    { name: 'Approche', href: '/#approche' },
    { name: 'Événements', href: '/events' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-white/95 backdrop-blur-md border-b border-slate-200">
      <Link
        href="/"
        className="flex items-center gap-2 cursor-pointer"
      >
        <motion.div whileHover={{ scale: 1.05 }}>
          <Image
            src="/logo.png"
            alt="Axenium Logo"
            width={80}
            height={80}
            className="object-contain"
          />
        </motion.div>
      </Link>

      <div className="hidden md:flex gap-8 items-center">
        {navItems.map((item) => (
          item.href.includes('#') ? (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-bold text-slate-500 hover:text-[#ee0c5d] transition-colors uppercase tracking-wider cursor-pointer"
            >
              {item.name}
            </a>
          ) : (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-bold text-slate-500 hover:text-[#ee0c5d] transition-colors uppercase tracking-wider"
            >
              {item.name}
            </Link>
          )
        ))}
        <a
          href="/#contact"
          className="px-6 py-2 bg-[#ee0c5d] text-white text-sm font-bold rounded-full hover:bg-[#d10a52] transition-all shadow-lg shadow-[#ee0c5d]/20 cursor-pointer"
        >
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
            className="absolute top-full left-0 w-full bg-white border-b border-slate-200 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            {navItems.map((item) => (
              item.href.includes('#') ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-bold text-slate-600 hover:text-[#ee0c5d] cursor-pointer"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-bold text-slate-600 hover:text-[#ee0c5d]"
                >
                  {item.name}
                </Link>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};