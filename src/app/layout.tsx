import { Metadata } from "next";
import React from "react";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { Navbar } from "@/components/landing/Navbar";
import { FloatingWhatsApp } from "@/components/landing/FloatingWhatsApp";
import { FloatingLogin } from "@/components/landing/FloatingLogin";

export const metadata: Metadata = {
  metadataBase: new URL("https://axenium.group"),
  title: {
    template: "%s | Axenium Consulting",
    default: "Axenium Consulting | Expertise Conseil en Afrique",
  },
  description: "Le réseau d'élite des consultants indépendants en BTP, IT, Télécoms, Agrobusiness, Industrialisation et Développement Durable pour sécuriser vos investissements en Afrique.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className="h-full antialiased"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Axenium Group",
              "image": "https://axenium.group/logo.png",
              "@id": "https://axenium.group",
              "url": "https://axenium.group",
              "telephone": "+237XXXXXXXXX",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Yaoundé",
                "addressLocality": "Yaoundé",
                "addressRegion": "Centre",
                "postalCode": "00237",
                "addressCountry": "CM"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "3.8480",
                "longitude": "11.5021"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                  ],
                  "opens": "08:00",
                  "closes": "18:00"
                }
              ],
              "sameAs": [
                "https://www.facebook.com/axeniumgroup",
                "https://www.linkedin.com/company/axeniumgroup",
                "https://www.instagram.com/axeniumgroup/"
              ]
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <Navbar />
          {children}
          <FloatingWhatsApp />
          <FloatingLogin />
        </AuthProvider>
      </body>
    </html>
  );
}
