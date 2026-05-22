import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface AdminNotificationEmailProps {
  userName: string;
  userEmail: string;
  userPhone: string;
}

export const AdminNotificationEmail = ({ userName, userEmail, userPhone }: AdminNotificationEmailProps) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="bg-slate-50 font-sans text-slate-900">
        <Container className="max-w-[600px] mx-auto py-10 px-4">
          <Section className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            <div className="mx-auto w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6">
              <span className="text-white font-bold text-xl">🔔</span>
            </div>
            <Heading className="text-2xl font-bold text-slate-900 mb-4 text-center">
              Nouvel Inscription Client
            </Heading>
            <Text className="text-slate-600 text-base mb-6 text-center">
              Un nouveau client vient de s'inscrire sur la plateforme Axenium. Voici les informations de contact pour le suivi :
            </Text>

            <Section className="bg-slate-100 rounded-xl p-6 mb-8 border border-slate-200">
              <Text className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Informations Client :</Text>
              <Text className="text-sm text-slate-600 mb-2">👤 <strong>Nom :</strong> {userName}</Text>
              <Text className="text-sm text-slate-600 mb-2">📧 <strong>Email :</strong> {userEmail}</Text>
              <Text className="text-sm text-slate-600">📞 <strong>Téléphone :</strong> {userPhone}</Text>
            </Section>

            <div className="text-center mb-8">
              <p className="text-xs text-slate-400 mb-4">Vous pouvez gérer ce client depuis le tableau de bord administrateur.</p>
              <a
                href={`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/users`}
                style={{
                  backgroundColor: '#231f20',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                Gérer l'utilisateur
              </a>
            </div>

            <Hr className="border-slate-100 my-8" />
            <Text className="text-slate-400 text-xs text-center">
              Alerte automatique système Axenium.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
