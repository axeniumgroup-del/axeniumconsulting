"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Calendar, MapPin, Ticket, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(`/api/events?id=${id}`); // Note: we need a detailed endpoint, for now use a generic one and filter
        const data = await res.json();
        const found = data.find((e: any) => e.id === id);
        setEvent(found);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvent();
  }, [id]);

  async function handlePurchase() {
    setIsPurchasing(true);
    try {
      const res = await fetch("/api/tickets/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: id }),
      });
      const data = await res.json();
      if (res.ok) {
        setTicketId(data.id);
      } else {
        alert(data.error || "Erreur lors de l'achat");
      }
    } catch (error) {
      console.error("Purchase error:", error);
    } finally {
      setIsPurchasing(false);
    }
  }

  if (isLoading) return <div className="p-8 text-center">Chargement...</div>;
  if (!event) return <div className="p-8 text-center">Événement non trouvé.</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <Link href="/events" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors">
        <ArrowLeft size={18} />
        Retour au catalogue
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="aspect-video rounded-3xl overflow-hidden bg-slate-100 shadow-lg">
            {event.image ? (
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300">
                <Calendar size={48} />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 text-slate-600">
              <Calendar className="text-blue-500" size={20} />
              <span className="font-medium">{new Date(event.date).toLocaleDateString("fr-FR", {
                day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
              })}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <MapPin className="text-blue-500" size={20} />
              <span className="font-medium">{event.location}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <Ticket className="text-blue-500" size={20} />
              <span className="font-bold text-slate-900">{event.price === 0 ? "Gratuit" : `${event.price} F CFA`}</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900 leading-tight mb-4">
              {event.title}
            </h1>
            <div className="p-6 bg-slate-50 rounded-2xl text-slate-600 leading-relaxed whitespace-pre-wrap">
              {event.description}
            </div>
          </div>

          {ticketId ? (
            <div className="p-6 bg-green-50 border border-green-200 rounded-2xl text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={32} />
              </div>
              <div>
                <h3 className="font-bold text-green-900">Ticket réservé avec succès !</h3>
                <p className="text-green-700 text-sm">Votre ticket est disponible dans votre espace client.</p>
              </div>
              <Link
                href={`/tickets/${ticketId}`}
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors"
              >
                Voir mon Ticket
              </Link>
            </div>
          ) : (
            <button
              onClick={handlePurchase}
              disabled={isPurchasing}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isPurchasing ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Ticket size={24} />
                  Réserver mon accès
                </>
              )}
            </button>
          </div>
        </div
      </div>
    </div>
  );
}
