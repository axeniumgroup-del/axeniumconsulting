"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Lock, Mail, ShieldCheck, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Toast } from "@/components/ui/toast";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setToastMessage(null);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // Successful login, redirect to client dashboard
      router.push("/client");
      router.refresh();
    } catch (err: any) {
      setToastMessage(err.message || "Une erreur est survenue lors de la connexion");
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
            <h1 className="text-3xl font-bold text-[#231f20] tracking-tight">Bienvenue chez AXENIUM</h1>
            <p className="text-slate-500 text-sm">Connectez-vous pour accéder à votre espace sécurisé</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ml-1">Email ou Téléphone</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee0c5d]/20 focus:border-[#ee0c5d] transition-all text-slate-800"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-slate-700">Mot de passe</label>
                <Link href="/forgot-password" className="text-xs text-[#ee0c5d] hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee0c5d]/20 focus:border-[#ee0c5d] transition-all text-slate-800"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 text-base font-medium bg-[#ee0c5d] hover:bg-[#d10a52] text-white transition-all shadow-lg shadow-[#ee0c5d]/20 flex items-center justify-center gap-2"
            >
              {isLoading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : "Se connecter"}
            </Button>
          </form>

          <div className="text-center pt-4">
            <p className="text-sm text-slate-600">
              Pas encore de compte ?{" "}
              <Link href="/signup" className="text-[#ee0c5d] font-semibold hover:text-[#d10a52] transition-colors">
                Créer un compte client
              </Link>
            </p>
          </div>
        </div>
      </div>
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </>
  );
}
