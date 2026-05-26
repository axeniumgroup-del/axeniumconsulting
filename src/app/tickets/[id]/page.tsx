"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Ticket, Calendar, MapPin, QRCode, User, Download } from "lucide-react";
import Link from "next/link";

export default function TicketPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTicket() {
      try {
        // Since we don't have a direct /api/tickets/[id] endpoint yet, we use a simple fetch (needs to be created)
        const res = await fetch(`/api/tickets/${id}`);
        const data = await res.json();
        setTicket(data);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTicket();
  }, [id]);

  if (isLoading) return <div className="p-8 text-center">Chargement...</div>;
  if (!ticket) return <div className="p-8 text-center">Ticket non trouvé.</div>;

  return (
    <div className="p-8 max-w-md mx-auto">
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-2xl overflow-hidden">
        <div className="bg-slate-900 p-6 text-white text-center">
          <h1 className="text-2xl font-black uppercase tracking-widest">Axenium Pass</h1>
          <p className="text-slate-400 text-xs">Accès Officiel Événement</p>
        </div>

        <div className="p-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-slate-900">{ticket.event.title}</h2>
            <p className="text-slate-500 text-sm">{new Date(ticket.event.date).toLocaleDateString("fr-FR", {
              day: "numeric", month: "long", year: "numeric"
            })}</p>
          </div>

          <div className="flex justify-center p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300">
            <div className="w-48 h-48 bg-white p-2 rounded-xl shadow-inner flex items-center justify-center">
              {/* Simulation de QR Code */}
              <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center text-white font-mono text-xs text-center p-2">
                {ticket.qrCode}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <User size={16} />
                <span>Titulaire</span>
              </div>
              <span className="font-bold text-slate-900">{ticket.user.name}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Calendar size={16} />
                <span>Date d'émission</span>
              </div>
              <span className="font-bold text-slate-900">{new Date(ticket.purchaseDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <MapPin size={16} />
                <span>Lieu</span>
              </div>
              <span className="font-bold text-slate-900 truncate max-w-[150px]">{ticket.event.location}</span>
            </div>
          </div>

          <div className="pt-4">
            <button
              className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
              onClick={() => window.print()}
            >
              <Download size={20} />
              Télécharger le Ticket
            </button>
          </div>
        </div>
      </div>

      <Link href="/events" className="block text-center mt-8 text-slate-500 hover:text-blue-600 transition-colors">
        Retour aux événements
      </Link>
    </div>
  );
}
