"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, User, Settings, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

export const ClientNavbar = () => {
  const { data: session } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  const user = session?.user;
  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
    : 'C';

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await fetch('/api/client/notifications');
        const data = await res.json();
        if (res.ok) {
          setNotifications(data.notifications || []);
        }
      } catch (err) {
        console.error("Failed to load notifications", err);
      }
    }
    fetchNotifications();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 flex items-center justify-between shadow-2xl shadow-black/50">

          {/* Logo Section */}
          <Link href="/client" className="flex items-center gap-3 group transition-transform hover:scale-105">
            <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-white p-1 group-hover:ring-2 ring-[#ee0c5d] transition-all">
              <Image
                src="/logo.png"
                alt="Axenium Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="hidden sm:block text-white font-black tracking-tighter text-lg uppercase italic">
              Axenium <span className="text-[#ee0c5d]">Client</span>
            </span>
          </Link>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Notifications */}
            <button
              className="relative p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              onClick={() => {}}
            >
              <Bell size={20} />
              {notifications.length > 0 && (
                <span className="absolute top-2 right-2 w-4 h-4 bg-[#ee0c5d] text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#0f172a]">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-1.5 pl-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#ee0c5d] to-indigo-500 flex items-center justify-center text-white font-bold text-xs">
                  {initials}
                </div>
                <div className="text-left mr-1">
                  <p className="text-white text-xs font-bold leading-none">{user?.name || "Mon Espace"}</p>
                  <p className="text-slate-500 text-[10px] uppercase tracking-wider">Premium Client</p>
                </div>
                <ChevronDown size={14} className={`text-slate-500 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-3 w-56 bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl"
                  >
                    <div className="p-4 border-b border-white/5 bg-white/5">
                      <p className="text-white text-sm font-bold">Bienvenue,</p>
                      <p className="text-slate-400 text-xs">{user?.email || "client@axenium.group"}</p>
                    </div>
                    <div className="p-2">
                      <Link href="/client/profile" className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                        <User size={16} /> Mon Compte
                      </Link>
                      <Link href="/client/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                        <Settings size={16} /> Préférences
                      </Link>
                      <div className="h-px bg-white/10 my-2" />
                      <button
                        onClick={() => signOut({ callbackUrl: '/login' })}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <LogOut size={16} /> Déconnexion
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 mt-2 p-4"
            >
              <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-4 space-y-4 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-[#ee0c5d] flex items-center justify-center text-white font-bold">{initials}</div>
                  <div>
                    <p className="text-white text-sm font-bold">{user?.name || "Mon Espace"}</p>
                    <p className="text-slate-500 text-xs">Premium Client</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link href="/client/profile" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                    <User size={18} /> Mon Compte
                  </Link>
                  <Link href="/client/settings" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                    <Settings size={18} /> Préférences
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-left"
                  >
                    <LogOut size={18} /> Déconnexion
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
