"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, Ticket, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  image: string | null;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Événements Axenium</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Rejoignez nos conférences et ateliers exclusifs pour propulser votre business vers de nouveaux sommets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">Aucun événement prévu pour le moment.</p>
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-video relative overflow-hidden">
                  {event.image ? (
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                      <Calendar size={48} />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-blue-600 shadow-sm">
                    {event.price === 0 ? "Gratuit" : `${event.price} F CFA`}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-3">
                    {event.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar size={16} className="text-blue-500" />
                      {new Date(event.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin size={16} className="text-blue-500" />
                      {event.location}
                    </div>
                  </div>

                  <Link
                    href={`/events/${event.id}`}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors group"
                  >
                    Réserver mon ticket
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
}
