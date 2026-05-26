"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { SERVICES } from "@/components/landing/constants";
import { WhatsAppButton } from "@/components/landing/WhatsAppButton";
import Link from "next/link";

export default function ServicePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [service, setService] = useState<any>(null);

  useEffect(() => {
    const found = SERVICES.find(s => s.id === slug);
    if (found) setService(found);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-center bg-white">
        <div className="max-w-md">
          <h1 className="text-4xl font-black text-slate-900 mb-4">Service non trouvé</h1>
          <p className="text-slate-500 mb-8">Le service que vous recherchez n'existe pas ou a été déplacé.</p>
          <Link href="/" className="px-6 py-3 bg-[#ee0c5d] text-white font-bold rounded-full hover:bg-[#d10a52] transition-colors">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - ATTENTION */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-slate-900 text-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#ee0c5d] opacity-10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-bold uppercase tracking-widest text-[#ee0c5d]">
              <ShieldCheck size={14} />
              Expertise Certifiée
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              {service.aida.attention}
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
              {service.subtitle} — L'excellence opérationnelle au service de votre croissance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Problem Section - INTEREST */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Pourquoi c'est critique pour vous ?
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {service.aida.interest}
              </p>
              <div className="p-6 bg-white rounded-2xl border-l-4 border-[#ee0c5d] shadow-sm">
                <p className="text-slate-700 italic font-medium">
                  "Le coût de l'inaction est souvent bien supérieur au coût de l'expertise."
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-100 rounded-full -translate-y-8 translate-x-8" />
              <h3 className="text-xl font-bold text-slate-900 mb-6">Enjeux Clés</h3>
              <div className="space-y-4">
                {service.features.map((f: string) => (
                  <div key={f} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="p-1 bg-[#ee0c5d] text-white rounded-full"><CheckCircle2 size={14} /></div>
                    <span className="text-slate-700 font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section - DESIRE */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              La Réponse Axenium
            </h2>
            <div className="h-1 w-24 bg-[#ee0c5d] mx-auto" />
          </div>

          <div className="p-8 md:p-12 bg-slate-900 rounded-3xl text-white relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#ee0c5d]/20 to-transparent" />
             <div className="relative z-10 space-y-6 text-center">
                <p className="text-xl md:text-2xl leading-relaxed font-light italic">
                  "{service.aida.desire}"
                </p>
                <div className="grid md:grid-cols-3 gap-6 pt-8">
                  <div className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <h4 className="font-bold text-white mb-2">Sourcing Premium</h4>
                    <p className="text-slate-400 text-xs">Experts seniors vérifiés</p>
                  </div>
                  <div className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <h4 className="font-bold text-white mb-2">Rigueur Totale</h4>
                    <p className="text-slate-400 text-xs">Standard de qualité strict</p>
                  </div>
                  <div className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <h4 className="font-bold text-white mb-2">ROI Garanti</h4>
                    <p className="text-slate-400 text-xs"> la l'excellence opérationnelle</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section - ACTION */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-slate-900">Prêt à sécuriser vos opérations ?</h2>
            <p className="text-slate-600">Ne laissez pas vos actifs critiques au hasard. Prenez une décision stratégique aujourd'hui.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <WhatsAppButton
              message={`Bonjour Axenium, je souhaite bénéficier de l'expertise en ${service.title}. ${service.aida.action}`}
            />
            <Link
              href="/#contact"
              className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              Demander un devis <ArrowRight size={18} />
            </Link>
          </div>

          <div className="flex items-center justify-center gap-4 pt-8 text-slate-400 text-xs font-medium uppercase tracking-widest">
            <div className="flex items-center gap-1"><ShieldCheck size={14} /> Confidentialité Garantie</div>
            <div className="flex items-center gap-1"><ShieldCheck size={14} /> Experts Certifiés</div>
          </div>
        </div>
      </section>
    </div>
  );
}
