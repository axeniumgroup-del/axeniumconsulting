import { Metadata } from 'next';
import { HomeContent } from '@/components/landing/HomeContent';

export const metadata: Metadata = {
  title: 'Axenium Group | Expertise Conseil BTP & Transformation Digitale à Yaoundé',
  description: 'Accompagnement stratégique en BTP, IT et Télécommunications. Nous sécurisons vos infrastructures et accélérons votre transformation numérique en Afrique.',
  openGraph: {
    title: 'Axenium Group | Expertise Conseil BTP & Transformation Digitale',
    description: 'Accompagnement stratégique en BTP, IT et Télécommunications pour les entreprises en Afrique.',
    url: 'https://axenium.group',
    siteName: 'Axenium Group',
    images: [
      {
        url: 'https://axenium.group/og-image.png', // Assure-toi que ce fichier existe
        width: 1200,
        height: 630,
        alt: 'Axenium Group - Expertise BTP & IT',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axenium Group | Expertise Conseil BTP & Transformation Digitale',
    description: 'Accompagnement stratégique en BTP, IT et Télécommunications pour les entreprises en Afrique.',
    images: ['https://axenium.group/og-image.png'],
  },
};

export default function Page() {
  return <HomeContent />;
}
