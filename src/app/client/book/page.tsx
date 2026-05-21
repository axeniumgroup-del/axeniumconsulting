"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, CheckCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function BookingPage() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const timeSlots = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const handleBooking = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time }),
      });

      if (response.ok) {
        setStep(2);
      }
    } catch (err) {
      alert("Erreur lors de la réservation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* BG Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ee0c5d]/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl relative z-10"
      >
        <div className="p-8">
          {step === 1 ? (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Réservez votre Diagnostic</h1>
                <p className="text-slate-400 text-sm">Choisissez le créneau qui vous convient pour votre session stratégique.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                    <CalendarIcon className="w-3 h-3" /> Date du rendez-vous
                  </label>
                  <input
                    type="date"
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-[#ee0c5d] text-white"
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                    <Clock className="w-3 h-3" /> Heure disponible
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => setTime(slot)}
                        className={`py-3 rounded-xl text-sm font-medium transition-all border ${
                          time === slot
                          ? "bg-[#ee0c5d] border-[#ee0c5d] text-white shadow-lg shadow-[#ee0c5d]/30"
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                onClick={handleBooking}
                disabled={!date || !time || isLoading}
                className="w-full py-6 bg-[#ee0c5d] hover:bg-[#d10a52] text-white font-bold rounded-2xl transition-all"
              >
                {isLoading ? "Confirmation..." : "Confirmer le RDV"}
              </Button>
            </div>
          ) : (
            <div className="text-center py-12 space-y-6">
              <div className="mx-auto w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">C'est validé !</h2>
                <p className="text-slate-400">Votre rendez-vous est enregistré. Notre expert vous contactera sous peu.</p>
              </div>
              <Button
                onClick={() => window.location.href = "/client"}
                className="w-full py-6 bg-white/10 text-white hover:bg-white/20 border border-white/20 rounded-2xl"
              >
Retour au Dashboard
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
