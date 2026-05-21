import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Button,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  name: string;
  email: string;
}

export const WelcomeEmail = ({ name, email }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="bg-slate-50 font-sans text-slate-900">
        <Container className="max-w-[600px] mx-auto py-10 px-4">
          <Section className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            <div className="mx-auto w-12 h-12 bg-[#ee0c5d] rounded-xl flex items-center justify-center mb-6">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <Heading className="text-2xl font-bold text-slate-900 mb-4 text-center">
              Bienvenue chez Axenium, {name} ! 🚀
            </Heading>
            <Text className="text-slate-600 text-base mb-6 text-center">
              C'est un plaisir de vous compter parmi nous. Votre compte a été créé avec succès et vous êtes désormais prêt à découvrir nos services premium.
            </Text>

            <Section className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-100">
              <Text className="text-sm font-semibold text-slate-700 mb-2">Détails de votre compte :</Text>
              <Text className="text-sm text-slate-600 mb-1">📧 Email : {email}</Text>
              <Text className="text-sm text-slate-600">🔒 Sécurité : Votre accès est désormais sécurisé.</Text>
            </Section>

            <div className="text-center mb-8">
              <Button
                href="http://localhost:3000/client"
                className="bg-[#ee0c5d] text-white px-8 py-3 rounded-full font-bold no-underline"
              >
                Accéder à mon espace
              </Button>
            </div>

            <Text className="text-slate-500 text-sm text-center italic">
              "L'excellence est un art que nous cultivons ensemble."
            </Text>

            <Hr className="border-slate-100 my-8" />
            <Text className="text-slate-400 text-xs text-center">
              © 2026 Axenium. Tous droits réservés.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
