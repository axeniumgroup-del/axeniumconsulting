import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { phoneNumber, email } = await req.json();

    if (!phoneNumber) {
      return NextResponse.json({ error: "Numéro de téléphone requis" }, { status: 400 });
    }

    // 1. Récupérer le numéro du Super Admin depuis les paramètres
    const settings = await prisma.settings.findUnique({
      where: { id: "global" },
    });

    const adminPhone = settings?.adminPhoneNumber || "+237696022056";

    // 2. Simulation de l'envoi d'un message au Super Admin
    // Dans la réalité, on utiliserait Twilio ou Meta Cloud API ici.
    console.log(`[WhatsApp Notification] Message envoyé au Super Admin (${adminPhone}) :
    🔔 Nouvelle tentative d'inscription !
    Client: ${email || "Inconnu"}
    Numéro: ${phoneNumber}
    Action: Vérification en cours...`);

    // 3. Génération d'un OTP pour le client
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Simulation de l'envoi de l'OTP au client via WhatsApp
    console.log(`[WhatsApp OTP] Message envoyé au Client (${phoneNumber}) :
    Votre code de vérification Axenium est : ${otp}.
    Ceci est un message automatique, ne le partagez pas.`);

    return NextResponse.json({
      success: true,
      message: "Notification envoyée au Super Admin et code WhatsApp expédié",
      otp // On renvoie l'OTP pour le test
    });
  } catch (error: any) {
    console.error("WhatsApp API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
