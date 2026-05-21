"use client";

import React, { useEffect } from "react";
import { X, AlertCircle } from "lucide-react";

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export const Toast = ({ message, duration = 10000, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-5 right-5 z-//max-z flex items-center gap-3 p-4 bg-white border-l-4 border-[#ee0c5d] rounded-lg shadow-2xl animate-in slide-in-from-right duration-300 max-w-sm">
      <div className="flex-shrink-0 w-8 h-8 bg-[#ee0c5d]/10 rounded-full flex items-center justify-center">
        <AlertCircle className="text-[#ee0c5d] w-5 h-5" />
      </div>
      <div className="flex-1 text-sm font-medium text-slate-700">
        {message}
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
