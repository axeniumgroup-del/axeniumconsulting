"use client";

import { useEffect, useState } from "react";
import { Bell, Check, Mail, AlertCircle } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNotifications();
  }, []);

  async function markAsRead(id: string) {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  }

  async function markAllAsRead() {
    try {
      await fetch("/api/notifications", { method: "PUT" });
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (error) {
      console.error("Error marking all as read:", error);
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
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <Bell size={24} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
        </div>
        {notifications.some(n => !n.isRead) && (
          <button
            onClick={markAllAsRead}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            <Check size={14} />
            Tout marquer comme lu
          </button>
        )}
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <Mail size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">Aucune notification pour le moment.</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => !n.isRead && markAsRead(n.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                n.isRead
                  ? "bg-white border-slate-200 opacity-75"
                  : "bg-blue-50 border-blue-200 shadow-sm ring-1 ring-blue-100"
              }`}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    n.type === "OFFER" ? "bg-amber-100 text-amber-600" :
                    n.type === "MATCH" ? "bg-green-100 text-green-600" :
                    "bg-blue-100 text-blue-600"
                  }`}>
                    {n.type === "OFFER" ? <AlertCircle size={20} /> : <Bell size={20} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`font-bold ${n.isRead ? "text-slate-700" : "text-slate-900"}`}>
                        {n.title}
                      </h3>
                      {!n.isRead && (
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      )}
                    </div>
                    <p className={`text-sm ${n.isRead ? "text-slate-500" : "text-slate-700"}`}>
                      {n.message}
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                      {new Date(n.createdAt).toLocaleDateString()} {new Date(n.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
