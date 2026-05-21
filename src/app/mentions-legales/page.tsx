import React from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

export default function MentionsLegales() {
  return (
    <div className="min-h-screen font-sans text-[#231f20] selection:bg-[#ee0c5d] selection:text-white">
      <Navbar />
      <main className="py-24 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-8 tracking-tighter">Mentions <span className="text-[#ee0c5d]">Légales</span></h1>

        <div className="space-y-8 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#231f20] mb-4">Éditeur du site</h2>
            <p>
              Le présent site est édité par <strong>AXENIUM GROUP</strong>, entreprise spécialisée dans le conseil et l'expertise en BTP, IT et Télécom, basée à Yaoundé, Cameroun.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#231f20] mb-4">Hébergement</h2>
            <p>
              Le site est hébergé sur des infrastructures sécurisées garantissant une disponibilité optimale des services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#231f20] mb-4">Propriété Intellectuelle</h2>
            <p>
              L'ensemble du contenu présent sur ce site (textes, logos, graphismes, images) est la propriété exclusive d'AXENIUM GROUP, sauf mention contraire. Toute reproduction, distribution ou modification non autorisée est strictement interdite.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#231f20] mb-4">Contact</h2>
            <p>
              Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter via notre formulaire de contact ou via WhatsApp.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
