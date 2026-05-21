import React from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen font-sans text-[#231f20] selection:bg-[#ee0c5d] selection:text-white">
      <Navbar />
      <main className="py-24 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-8 tracking-tighter">Politique de <span className="text-[#ee0c5d]">Confidentialité</span></h1>

        <div className="space-y-8 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#231f20] mb-4">Introduction</h2>
            <p>
              Chez AXENIUM GROUP, la confidentialité de vos données est une priorité absolue. Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#231f20] mb-4">Collecte des Données</h2>
            <p>
              Nous collectons uniquement les informations nécessaires pour traiter vos demandes (nom, email, numéro de téléphone) via nos formulaires de contact et interactions WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#231f20] mb-4">Utilisation des Informations</h2>
            <p>
              Vos données sont utilisées exclusivement pour :
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Répondre à vos demandes de consultation.</li>
              <li>Optimiser la qualité de nos services de conseil.</li>
              <li>Assurer le suivi opérationnel de nos engagements.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#231f20] mb-4">Sécurité et Conservation</h2>
            <p>
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé. Vos données sont conservées uniquement le temps nécessaire aux finalités pour lesquelles elles ont été collectées.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#231f20] mb-4">Vos Droits</h2>
            <p>
              Conformément aux réglementations en vigueur, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles sur simple demande.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
