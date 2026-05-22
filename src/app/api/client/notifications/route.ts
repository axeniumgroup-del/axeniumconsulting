import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 });
    }

    const allNotifications = [];

    // 1. Database Notifications (Admin, Employee, Referrals)
    const dbNotifications = await prisma.notification.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    allNotifications.push(...dbNotifications);

    // 2. Onboarding Notifications (Calculated dynamically)
    if (!user.phoneNumber) {
      allNotifications.push({
        id: "complete-whatsapp",
        title: "Complétez votre profil",
        message: "Ajoutez votre numéro WhatsApp pour un suivi prioritaire.",
        type: "ONBOARDING",
        actionUrl: "/client/settings",
        isRead: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    if (!user.email) {
      allNotifications.push({
        id: "complete-email",
        title: "Sécurisez votre compte",
        message: "Liez un email à votre compte pour recevoir vos notifications.",
        type: "ONBOARDING",
        actionUrl: "/client/settings",
        isRead: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return NextResponse.json({
      count: allNotifications.length,
      notifications: allNotifications
    }, { status: 200 });

  } catch (error) {
    console.error("Notifications error:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
