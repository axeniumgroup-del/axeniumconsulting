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

interface FollowUpProps {
  level: number;
  name?: string;
}

export const FollowUpEmail = ({ level, name = "Client" }: FollowUpProps) => {
  const content = {
    1: {
      subject: "Une précision sur votre projet",
      text: "Nous avons analysé vos premières informations. Il semble y avoir un levier de croissance majeur pour votre activité. Seriez-vous disponible pour un échange rapide ?",
    },
    2: {
      subject: "Optimisation de vos actifs",
      text: "L'équipe technique a relevé quelques points d'optimisation critiques pour votre structure. C'est le moment idéal pour sécuriser vos flux.",
    },
    3: {
      subject: "Dernière tentative de contact",
      text: "Nous avons tenté de vous accompagner dans votre croissance, mais nous n'avons pas eu de retour. Nous fermons votre dossier pour le moment, mais nous restons à votre disposition.",
    },
  }[level || 1] || { subject: "Suivi Axenium", text: "Nous souhaitons faire le point sur votre projet." };

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-slate-50 font-sans text-slate-900">
          <Container className="max-w-[600px] mx-auto py-10 px-4">
            <Section className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center">
              <div className="mx-auto w-12 h-12 bg-[#ee0c5d] rounded-xl flex items-center justify-center mb-6">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <Heading className="text-2xl font-bold text-slate-900 mb-4">
                Suivi de votre projet Axenium
              </Heading>
              <Text className="text-slate-600 text-base mb-8">
                Bonjour {name}, <br /><br />
                {content.text}
              </Text>
              <Button
                href="https://calendly.com/axenium"
                className="bg-[#ee0c5d] text-white px-6 py-3 rounded-xl font-bold"
              >
                Prendre rendez-vous
              </Button>
              <Hr className="border-slate-100 mt-8 mb-8" />
              <Text className="text-slate-400 text-xs">
                © 2026 Axenium. L'excellence opérationnelle.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
