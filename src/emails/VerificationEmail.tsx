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
  Row,
  Column,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface VerificationEmailProps {
  otp: string;
  name?: string;
}

export const VerificationEmail = ({ otp, name = "Client" }: VerificationEmailProps) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="bg-slate-50 font-sans text-slate-900">
        <Container className="max-w-[600px] mx-auto py-10 px-4">
          <Section className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center">
            <div className="mx-auto w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <Heading className="text-2xl font-bold text-slate-900 mb-4">
              Vérification de votre compte Axenium
            </Heading>
            <Text className="text-slate-600 text-base mb-8">
              Bonjour {name}, merci d'avoir choisi Axenium. Pour finaliser votre inscription, veuillez utiliser le code de vérification ci-dessous :
            </Text>

            <Section className="bg-slate-100 rounded-xl py-6 px-4 mb-8">
              <Text className="text-4xl font-mono font-bold text-indigo-600 tracking-widest">
                {otp}
              </Text>
            </Section>

            <Text className="text-slate-400 text-xs mb-8">
              Ce code expirera dans 15 minutes. Si vous n'avez pas initié cette demande, vous pouvez ignorer cet email.
            </Text>

            <Hr className="border-slate-100 mb-8" />

            <Text className="text-slate-400 text-xs">
              © 2026 Axenium. Tous droits réservés.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
