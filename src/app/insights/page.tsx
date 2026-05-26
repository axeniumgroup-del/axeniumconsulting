import React from 'react';
import Link from 'next/link';
import { INSIGHTS } from '@/components/landing/insights/constants';
import { ArrowRight } from 'lucide-react';

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#231f20]">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Insights <span className="text-[#ee0c5d]">& Expertise</span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Analyses stratégiques, études de cas et réflexions sur la résilience des infrastructures en Afrique.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INSIGHTS.map((article) => (
            <div key={article.slug} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-video bg-slate-100 relative overflow-hidden">
                {/* Placeholder image */}
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-50">
                   <span className="text-xs font-bold uppercase tracking-widest">Axenium Insights</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-slate-100 text-slate-600 rounded">
                    {article.category}
                  </span>
                  <span className="text-xs text-slate-400">{article.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#ee0c5d] transition-colors">
                  {article.title}
                </h3>
                <p className="text-slate-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
                <Link
                  href={`/insights/${article.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#231f20] group-hover:text-[#ee0c5d] transition-colors"
                >
                  Lire l'article <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
