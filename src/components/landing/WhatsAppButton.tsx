"use client";

import React from 'react';
import { MessageCircle, ChevronRight } from 'lucide-react';

interface WhatsAppButtonProps {
  message: string;
}

export const WhatsAppButton = ({ message }: WhatsAppButtonProps) => {
  const trackClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'whatsapp_click', {
        'event_category': 'Conversion',
        'event_label': message.substring(0, 30)
      });
    }
  };

  const encodedMsg = encodeURIComponent(message);
  const phone = "237622147618";

  return (
    <a
      href={`https://wa.me/${phone}?text=${encodedMsg}`}
      onClick={trackClick}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full py-4 bg-[#231f20] text-white text-sm font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-[#ee0c5d] transition-all group"
    >
      <MessageCircle size={18} />
      Demander un conseil expert
      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
    </a>
  );
};