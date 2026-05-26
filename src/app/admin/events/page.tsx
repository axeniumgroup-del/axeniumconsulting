"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, Trash2, Edit, Plus, Ticket } from "lucide-react";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  image: string | null;
  _count: {
    tickets: number;
  };
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/admin/events");
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

  async function deleteEvent(id: string) {
    if (!confirm("Voulez-vous vraiment supprimer cet événement ?")) return;
    try {
      const res = await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEvents((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  }

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gestion des Événements</h1>
          <p className="text-slate-500">Créez et gérez vos événements et la billetterie</p>
        </div>
        <Link
          href="/admin/events/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Nouvel Événement
        </Link>
      </div>

      <div className="grid gap-6">
        {events.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">Aucun événement créé pour le moment.</p>
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between gap-6"
            >
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                  {event.image ? (
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <Calendar size={32} />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-900">{event.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-1 font-bold text-blue-600">
                      <Ticket size={14} />
                      {event.price} F CFA
                    </div>
                  </div}
                  <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase text-slate-400">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    {event._count.tickets} Tickets vendus
                  </div
                </div>
              </div>

              <div className="flex items-center gap-3 self-center">
                <Link
                  href={`/admin/events/${event.id}`}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Modifier"
                >
                  <Edit size={20} />
                </Link>
                <button
                  onClick={() => deleteEvent(event.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Supprimer"
                >
                  <Trash2 size={20} />
                </button>
              </div
            </div>
          ))
        )}
      </div>
    </div>
  );
}
