"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  CheckCircle,
  Bell,
  MessageSquare,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Utilisateurs", href: "/admin/users", icon: Users },
  { name: "Validation Matchings", href: "/admin/matches", icon: CheckCircle },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Messagerie", href: "/chat", icon: MessageSquare },
  { name: "Événements", href: "/events", icon: Calendar },
  { name: "Paramètres", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#231f20] text-white transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static
      `}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-8 h-8 bg-[#ee0c5d] rounded-lg flex items-center justify-center shadow-lg shadow-[#ee0c5d]/30">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">Axenium Admin</span>
          </div>

          <nav className="flex-grow space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-xl transition-all group
                    ${isActive
                      ? "bg-[#ee0c5d] text-white shadow-md shadow-[#ee0c5d]/20"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"}
                  `}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}`} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-800">
            <Button
              onClick={() => signIn()}
              className="w-full flex items-center justify-center gap-3 py-6 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border-none"
            >
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-grow" />

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">Administrateur</p>
              <p className="text-xs text-slate-500">Accès complet</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=Admin&background=ee0c5d&color=fff" alt="Admin" />
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
