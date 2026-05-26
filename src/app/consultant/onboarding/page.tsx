"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";
import { saveConsultantProfile } from "@/app/actions/consultant";
import { User, Briefcase, DollarSign, Link as LinkIcon, Plus, X, Loader2, CheckCircle } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [formData, setFormData] = useState({
    bio: "",
    dailyRate: 0,
    yearsExperience: 0,
    portfolioUrl: "",
  });

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setToastMessage(null);

    try {
      const result = await saveConsultantProfile({
        ...formData,
        skills: skills,
      });

      if (result.success) {
        setToastMessage("Profil mis à jour avec succès !");
        setTimeout(() => {
          router.push("/consultant");
        }, 2000);
      } else {
        throw new Error(result.error || "Une erreur est survenue");
      }
    } catch (err: any) {
      setToastMessage(err.message || "Erreur lors de la sauvegarde");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-[#231f20] tracking-tight">Complétez votre profil Expert</h1>
          <p className="text-slate-500">C'est ici que vous attirez vos futurs clients. Soyez précis et professionnel.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <User className="w-4 h-4" /> Votre Biographie
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                placeholder="Décrivez votre expertise, vos domaines d'intervention et ce que vous apportez aux projets..."
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee0c5d]/20 focus:border-[#ee0c5d] transition-all text-slate-800 min-h-[120px]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4" /> Tarif Journalier (F CFA)
              </label>
              <input
                type="number"
                value={formData.dailyRate}
                onChange={(e) => setFormData({...formData, dailyRate: parseFloat(e.target.value) || 0})}
                placeholder="ex: 150000"
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee0c5d]/20 focus:border-[#ee0c5d] transition-all text-slate-800"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Années d'expérience
              </label>
              <input
                type="number"
                value={formData.yearsExperience}
                onChange={(e) => setFormData({...formData, yearsExperience: parseInt(e.target.value) || 0})}
                placeholder="ex: 5"
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee0c5d]/20 focus:border-[#ee0c5d] transition-all text-slate-800"
                required
              />
            </div>

            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <LinkIcon className="w-4 h-4" /> Lien vers Portfolio / LinkedIn
              </label>
              <input
                type="url"
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({...formData, portfolioUrl: e.target.value})}
                placeholder="https://linkedin.com/in/votre-profil"
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee0c5d]/20 focus:border-[#ee0c5d] transition-all text-slate-800"
              />
            </div>

            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium text-slate-700">Vos Compétences</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  placeholder="ex: React, Next.js, Docker..."
                  className="flex-grow p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee0c5d]/20 focus:border-[#ee0c5d] transition-all text-slate-800"
                />
                <Button type="button" onClick={addSkill} className="bg-[#ee0c5d] hover:bg-[#d10a52]">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full border border-slate-200 flex items-center gap-1">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="hover:text-red-500 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {skills.length === 0 && <p className="text-xs text-slate-400 italic">Ajoutez vos compétences clés pour être mieux matché.</p>}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-6 text-base font-medium bg-[#ee0c5d] hover:bg-[#d10a52] text-white transition-all shadow-lg shadow-[#ee0c5d]/20 flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Enregistrer mon profil"}
          </Button>
        </form>
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
