'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Frontend Error:', error);
  }, [error]);

  return (
    <html>
      <body className="bg-slate-50 font-sans text-slate-900">
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          <div className="max-w-md p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-red-100 rounded-full">
                <span className="text-2xl">🚨</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Erreur Critique</h2>
            <p className="text-slate-600 mb-8">
              Une erreur inattendue s'est produite. Nous travaillons à la résoudre.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => reset()}
                className="px-6 py-3 bg-[#ee0c5d] text-white font-bold rounded-xl hover:bg-[#d10a la] transition-colors"
              >
                Relancer l'application
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}