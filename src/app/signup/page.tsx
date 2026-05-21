"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShieldCheck, User, Mail, Phone, Loader2, MessageCircle, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/ui/toast";

type SignupMethod = "email" | "whatsapp";

export default function SignupPage() {
  const router = useRouter();
  const [method, setMethod] = useState<SignupMethod>("email");
  const [formData, setFormData] = useState({
    prenom: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPasswordModalOpen(true);
  };

  const handleFinalSignup = async () => {
    setIsLoading(true);
    setPasswordError(null);
    setError(null);

    if (!password || !confirmPassword) {
      setPasswordError("Veuillez remplir tous les champs");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message === "Cet email ou ce numéro de téléphone est déjà utilisé") {
          setToastMessage("Cet email ou ce numéro de téléphone est déjà utilisé. Veuillez consulter votre boîte email si vous avez oublié votre mot de passe.");
          setIsPasswordModalOpen(false);
          return;
        }
        throw new Error(data.message || "Une erreur est survenue");
      }

      router.push("/client");
    } catch (err: any) {
      setError(err.message);
      setIsPasswordModalOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="text-center space-y-2">
          <Link href="/" className="block">
            <div className="mx-auto w-12 h-12 bg-[#ee0c5d] rounded-xl flex items-center justify-center shadow-lg shadow-[#ee0c5d]/20 hover:scale-110 transition-transform cursor-pointer">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-[#231f20] tracking-tight">Rejoindre Axenium</h1>
          <p className="text-slate-500 text-sm">Choisissez votre méthode d'inscription pour accéder à nos services.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setMethod("email")}
            className={`flex flex-col items-center justify-center py-3 rounded-lg transition-all ${method === "email" ? "bg-white shadow-sm text-[#ee0c5d]" : "text-slate-500 hover:text-slate-700"}`}
          >
            <Mail className="w-5 h-5 mb-2" />
            <span className="text-[10px] font-bold uppercase">Email</span>
          </button>
          <button
            onClick={() => setMethod("whatsapp")}
            className={`flex flex-col items-center justify-center py-3 rounded-lg transition-all ${method === "whatsapp" ? "bg-white shadow-sm text-[#ee0c5d]" : "text-slate-500 hover:text-slate-700"}`}
          >
            <MessageCircle className="w-5 h-5 mb-2" />
            <span className="text-[10px] font-bold uppercase">WhatsApp</span>
          </button>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ml-1">Prénom</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  placeholder="Votre prénom"
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee0c5d]/20 focus:border-[#ee0c5d] transition-all text-slate-800"
                  required
                />
              </div>
            </div>

            {method === "email" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="exemple@mail.com"
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee0c5d]/20 focus:border-[#ee0c5d] transition-all text-slate-800"
                    required
                  />
                </div>
              </div>
            )}

            {method === "whatsapp" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 ml-1">Numéro WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+237 ..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee0c5d]/20 focus:border-[#ee0c5d] transition-all text-slate-800"
                    required
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 text-base font-medium bg-[#ee0c5d] hover:bg-[#d10a52] text-white transition-all shadow-lg shadow-[#ee0c5d]/20 flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "S'inscrire"}
            </Button>
          </form>

        <div className="text-center pt-4">
          <p className="text-sm text-slate-600">
            Déjà un compte ?{" "}
            <Link href="/login" className="text-[#ee0c5d] font-semibold hover:text-[#d10a52] transition-colors">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
    {isPasswordModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-[#ee0c5d]/10 rounded-full flex items-center justify-center mb-4">
                <Lock className="text-[#ee0c5d] w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-[#231f20]">Sécurisez votre compte</h2>
              <p className="text-slate-500 text-sm">Choisissez un mot de passe fort pour protéger vos données.</p>
            </div>

            {passwordError && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg text-center">
                {passwordError}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 ml-1">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee0c5d]/20 focus:border-[#ee0c5d] transition-all text-slate-800"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 ml-1">Confirmer le mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee0c5d]/20 focus:border-[#ee0c5d] transition-all text-slate-800"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setIsPasswordModalOpen(false);
                  setPasswordError(null);
                }}
                className="flex-1 py-6 text-base font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all"
                variant="outline"
              >
                Annuler
              </Button>
              <Button
                onClick={handleFinalSignup}
                disabled={isLoading}
                className="flex-1 py-6 text-base font-medium bg-[#ee0c5d] hover:bg-[#d10a52] text-white transition-all shadow-lg shadow-[#ee0c5d]/20 flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirmer"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )}
    {toastMessage && (
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    )}
    </>
  );
}
