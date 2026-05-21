"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Calendar, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Message = {
  id: string;
  role: "bot" | "user";
  content: string;
  timestamp: Date;
};

export function ConciergeChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      content: "Bienvenue chez Axenium. Je suis votre concierge numérique. Pour mieux vous accompagner, pourriez-vous me parler de vos objectifs business actuels ?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: data.reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [...prev, {
        id: "error",
        role: "bot",
        content: "Désolé, je rencontre une petite difficulté technique. Réessayons ensemble.",
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#ee0c5d] rounded-full flex items-center justify-center shadow-lg shadow-[#ee0c5d]/40 animate-pulse">
            <Bot className="text-white w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">Concierge AI</h3>
            <p className="text-slate-400 text-[10px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              En ligne | Expert B2B
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="px-3 py-1.5 text-xs bg-white/10 text-white hover:bg-white/20 border-none">
            Historique
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 scroll-smooth">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`
                max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed
                ${msg.role === "user"
                  ? "bg-[#ee0c5d] text-white rounded-tr-none shadow-lg shadow-[#ee0c5d]/20"
                  : "bg-white/20 text-white backdrop-blur-md border border-white/10 rounded-tl-none"}
              `}>
                {msg.content}
                <div className={`text-[9px] mt-2 opacity-50 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl rounded-tl-none border border-white/10">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/5 border-t border-white/10">
        <div className="relative flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Posez votre question..."
            className="flex-grow px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-slate-400 outline-none focus:ring-2 focus la-ring-[#ee0c5d] transition-all"
          />
          <Button
            onClick={sendMessage}
            className="p-3 bg-[#ee0c5d] hover:bg-[#d10a52] text-white rounded-xl shadow-lg shadow-[#ee0c5d]/30 transition-all"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
