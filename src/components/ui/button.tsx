import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
}

export function Button({ variant = 'default', className = '', ...props }: ButtonProps) {
  const variants = {
    default: 'bg-[#ee0c5d] text-white hover:bg-[#d10a52]',
    outline: 'border border-slate-200 bg-transparent text-slate-600 hover:bg-slate-50',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
