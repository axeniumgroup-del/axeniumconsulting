"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";
import { applyToNeed } from "@/app/actions/consultant";
import { ArrowLeft, Send, CheckCircle, Loader2 } from "lucide-react";

export default function ApplyNeedPage() {
  const params = useParams();
  const router = useRouter();
  const needId = params.id as string;
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setToastMessage(null);

    try {
      const result = await applyToNeed(needId, message);

      if (result.success) {
        setApplied(true);
        setToastMessage("Candidature envoyée avec succès !");
        setTimeout(() => {
          router.push("/consultant/needs");
        }, 3000);
      } else {
        throw new Error(result.error || "Une erreur est survenue");
      }
    } catch (err: any) {
      setToastMessage(err.message || "Erreur lors de l'envoi");
    } finally {
      setIsLoading(false);
    }
  };

  if (applied) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Candidature envoyée !</h2>
          <p className="text-slate-500">Le client a été notifié. Vous serez alerté dès qu'une décision sera prise.</p>
          <Button
            onClick={() => router.push("/consultant/needs")}
            className="w-full bg-[#ee0c5d] hover:bg-[#d10a52]"
          >
            Retour aux missions
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-[#ee0c5d]"
        >
          <ArrowLeft className="w-4 h-4" /> Retour aux opportunités
        </Button>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-800">Postuler à cette mission</h1>
            <p className="text-slate-500">Présentez vos motivations et expliquez pourquoi vous êtes le candidat idéal.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Send className="w-4 h-4" /> Message d'introduction
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Bonjour, je suis expert en... et je serais ravi d'accompagner votre projet car..."
                className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee0c5d]/20 focus:border-[#ee0c5d] transition-all text-slate-800 min-h-[200px]"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 text-base font-medium bg-[#ee0c5d] hover:bg-[#d10a52] text-white transition-all shadow-lg shadow-[#ee0c5d]/20 flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Envoyer ma candidature"}
            </Button>
          </form>
        </div>
      </div>
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
