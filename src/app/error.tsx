'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button'; // Assuming shadcn or a similar basic button exists, if not I will use a standard html button

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Frontend Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-slate-50">
      <div className="max-w-md p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-red-100 rounded-full">
            <span className="text-2xl">⚠️</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Oups ! Une erreur est survenue</h2>
        <p className="text-slate-600 mb-8">
          Le site a rencontré un problème technique. Ne vous inquiétez pas, nous avons été notifiés.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-[#ee0c5d] text-white font-bold rounded-xl hover:bg-[#d10a4d] transition-colors"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="px-6 py-3 bg-slate-100 text-slate-600 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}