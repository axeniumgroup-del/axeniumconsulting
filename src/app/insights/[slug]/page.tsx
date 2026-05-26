import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { INSIGHTS } from '@/components/landing/insights/constants';
import { Calendar, ArrowLeft, ChevronRight } from 'lucide-react';

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = INSIGHTS.find(a => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white font-sans text-[#231f20]">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#ee0c5d] mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Retour aux insights
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-[#ee0c5d] text-white rounded">
              {article.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Calendar size={12} />
              {article.date}
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
            {article.title}
          </h1>
          <div className="h-1 w-20 bg-[#ee0c5d] rounded-full" />
        </header>

        <div
          className="prose prose-slate max-w-none text-lg leading-relaxed text-slate-700 mb-16"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee0c5d] opacity-10 rounded-full -mr-16 -mt-16" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">Prêt à sécuriser vos infrastructures ?</h3>
            <p className="text-slate-600 mb-8 max-w-xl mx-auto">
              Obtenez un diagnostic expert personnalisé pour identifier vos risques et optimiser votre rentabilité.
            </p>
            <Link
              href="/client/book"
              className="inline-flex items-center gap-2 bg-[#ee0c5d] text-white px-8 py-4 rounded-full font-bold hover:bg-[#d40a53] transition-all transform hover:scale-105 shadow-lg"
            >
              Réserver mon diagnostic <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
