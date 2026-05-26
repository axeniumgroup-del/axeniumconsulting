"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Send, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Conversation {
  id: string;
  updatedAt: string;
  participants: {
    user: {
      name: string;
      image: string | null;
    };
  }[];
  messages: {
    content: string;
    createdAt: string;
  }[];
}

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeChat, setActiveChat] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchConversations() {
      try {
        const res = await fetch("/api/chat");
        const data = await res.json();
        setConversations(data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchConversations();
  }, []);

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50">
      {/* Sidebar: Conversations List */}
      <div className={`w-full md:w-80 bg-white border-r border-slate-200 flex flex-col ${activeChat ? 'hidden md:flex' : ''}`}>
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h1 className="font-bold text-lg text-slate-900 flex items-center gap-2">
            <MessageSquare className="text-blue-600" size={20} />
            Messagerie
          </h1>
        </div>

        <div className="flex-grow overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-slate-500">Aucune conversation active.</p>
            </div>
          ) : (
            conversations.map((conv) => {
              const otherParticipant = conv.participants.find(p =>
                p.user.name !== "Administrateur"
              ) || conv.participants[0];

              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveChat(conv)}
                  className={`p-4 cursor-pointer transition-colors hover:bg-slate-50 flex items-center gap-3 ${activeChat?.id === conv.id ? 'bg-blue-50 border-r-4 border-blue-600' : ''}`}
                >
                  <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                    <img src={`https://ui-avatars.com/api/?name=${otherParticipant.user.name}`} alt={otherParticipant.user.name} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 truncate">{otherParticipant.user.name}</p>
                    <p className="text-xs text-slate-500 truncate">
                      {conv.messages[0]?.content || "Démarrer la conversation..."}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`flex-grow flex flex-col bg-white ${!activeChat ? 'hidden md:flex items-center justify-center' : 'flex'}`}>
        {activeChat ? (
          <>
            <header className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveChat(null)}
                  className="md:hidden p-2 hover:bg-slate-100 rounded-full"
                >
                  <ArrowLeft size={20} />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=${activeChat.participants[0]?.user.name}`} alt="User" />
                  </div>
                  <p className="font-bold text-slate-900">Conversation</p>
                </div>
              </div>
            </header>

            <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50">
              {activeChat.messages.map((m, i) => (
                <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[70%] p-3 rounded-2xl ${i % 2 === 0 ? 'bg-white text-slate-800 rounded-tl-none border border-slate-200' : 'bg-blue-600 text-white rounded-tr-none shadow-md'}`}>
                    <p className="text-sm">{m.content}</p>
                    <p className="text-[10px] opacity-50 mt-1 text-right">{new Date(m.createdAt).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-200 bg-white">
              <div className="flex gap-3 max-w-4xl mx-auto">
                <input
                  type="text"
                  placeholder="Écrivez votre message..."
                  className="flex-grow p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center max-w-sm">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Messagerie</h2>
            <p className="text-slate-500">Sélectionnez une conversation pour commencer à discuter avec vos clients ou consultants.</p>
          </div>
        )}
      </div>
    </div>
  );
}
