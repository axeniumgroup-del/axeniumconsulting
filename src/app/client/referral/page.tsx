"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UserPlus, Gift, CheckCircle, ArrowLeft, Users } from "lucide-react";

export default function ReferralPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [myReferrals, setMyReferrals] = useState<any[]>([]);

  useEffect(() => {
    fetchMyReferrals();
  }, []);

  async function fetchMyReferrals() {
    try {
      const res = await fetch("/api/referrals");
      const data = await res.json();
      setMyReferrals(data);
    } catch (err) {
      console.error("Error fetching referrals:", err);
    }
  }

  const handleReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referredEmail: email, referredName: name }),
      });
      if (res.ok) {
        setSubmitted(true);
        setEmail("");
        setName("");
        fetchMyReferrals();
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      console.error("Error submitting referral:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#ee0c5d]/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-12 py-12">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 rounded-full"
            onClick={() => window.location.href = "/client"}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour
          </Button>
          <h1 className="text-3xl font-bold">Programme de Parrainage</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#ee0c5d] rounded-2xl">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Recommandez un partenaire</h2>
                <p className="text-slate-400 text-sm">Aidez vos pairs à optimiser leur business.</p>
              </div>
            </div>

            <form onSubmit={handleReferral} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Nom du contact</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Jean Dupont"
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-[#ee0c5d] text-white transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Email professionnel</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jean@entreprise.com"
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-[#ee0c5d] text-white transition-all"
                />
              </div>
              <Button
                disabled={isLoading}
                className="w-full py-6 bg-[#ee0c5d] hover:bg-[#d10a52] text-white font-bold rounded-2xl transition-all shadow-lg shadow-[#ee0c5d]/20"
              >
                {isLoading ? "Envoi en cours..." : "Envoyer la recommandation"}
              </Button>
            </form>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center gap-3 text-emerald-400 text-sm font-medium"
                >
                  <CheckCircle className="w-4 h-4" /> Recommandation envoyée avec succès !
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Status Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-indigo-600 rounded-2xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Votre Impact</h2>
                <p className="text-slate-400 text-sm">Suivez vos recommandations.</p>
              </div>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {myReferrals.length === 0 ? (
                <div className="text-center py-12 space-y-2">
                  <UserPlus className="w-12 h-12 text-slate-600 mx-auto" />
                  <p className="text-slate-500 text-sm">Aucune recommandation pour le moment.</p>
                </div>
              ) : (
                myReferrals.map((ref, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-all">
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{ref.referredName || "Contact"}</span>
                      <span className="text-xs text-slate-400">{ref.referredEmail}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${
                      ref.status === "CONVERTED" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                    }`}>
                      {ref.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
