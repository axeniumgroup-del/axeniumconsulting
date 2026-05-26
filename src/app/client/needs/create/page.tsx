"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";
import { createNeed } from "@/app/actions/client";
import { Briefcase, Target, Calendar, DollarSign, Plus, X, Loader2 } from "lucide-react";

export default function CreateNeedPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: 0,
    deadline: "",
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
      const result = await createNeed({
        ...formData,
        budget: formData.budget,
        deadline: new Date(formData.deadline),
        skills: skills,
      });

      if (result.success) {
        setToastMessage("Besoin publié avec succès !");
        setTimeout(() => {
          router.push("/client/needs");
        }, 2000);
      } else {
        throw new Error(result.error || "Une erreur est survenue");
      }
    } catch (err: any) {
      setToastMessage(err.message || "Erreur lors de la publication");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-[#231f20] tracking-tight">Publiez un besoin expert</h1>
          <p className="text-slate-500">Décrivez précisément votre besoin pour attirer les meilleurs consultants.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Target className="w-4 h-4" /> Titre de la mission
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="ex: Migration d'infrastructure vers AWS"
              className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee0c5d]/20 focus:border-[#ee0c5d] transition-all text-slate-800"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Description détaillée
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Expliquez les objectifs, les défis techniques et les livrables attendus..."
              className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee0c5d]/20 focus:border-[#ee0c5d] transition-all text-slate-800 min-h-[150px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4" /> Budget Estimé (F CFA)
              </label>
              <input
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: parseFloat(e.target.value) || 0})}
                placeholder="ex: 1000000"
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee0c5d]/20 focus:border-[#ee0c5d] transition-all text-slate-800"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Date limite souhaitée
              </label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee0c5d]/20 focus:border-[#ee0c5d] transition-all text-slate-800"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Compétences requises</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                placeholder="ex: React, Cybersecurity, DevOps..."
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
              {skills.length === 0 && <p className="text-xs text-slate-400 italic">Saisissez les compétences indispensables pour cette mission.</p>}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-6 text-base font-medium bg-[#ee0c5d] hover:bg-[#d10a52] text-white transition-all shadow-lg shadow-[#ee0c5d]/20 flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publier le besoin"}
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
