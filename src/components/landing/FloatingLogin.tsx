"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const FloatingLogin = () => {
  return (
    <div className="fixed bottom-8 left-8 z-50 group">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative"
      >
        <Link
          href="/login"
          className="bg-[#ee0c5d] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#d10a52] transition-colors"
        >
          <ShieldCheck size={28} />
        </Link>
        <span className="absolute left-full ml-4 bg-white text-[#231f20] text-xs font-bold px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap border border-slate-100 pointer-events-none">
          Accéder à mon espace
        </span>
      </motion.div>
    </div>
  );
};