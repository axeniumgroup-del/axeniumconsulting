import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { logger } from "@/lib/logger";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: "ID utilisateur requis" }, { status: 400 });
    }

    // Note: En production, vérifiez ici que l'utilisateur session est bien ADMIN
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.email) {
      return NextResponse.json({ message: "Utilisateur ou email non trouvé" }, { status: 404 });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 3 * 60 * 60 * 1000); // 3 heures (standard admin)

    await prisma.passwordReset.upsert({
      where: { email: user.email },
      update: { token: resetToken, expiresAt },
      create: { email: user.email, token: resetToken, expiresAt },
    });

    return NextResponse.json({ message: "Token de réinitialisation généré avec succès (Email désactivé)" }, { status: 200 });

  } catch (error) {
    logger.error("Admin reset token l'erreur", error);
    return NextResponse.json({ message: "Une erreur est survenue" }, { status: 500 });
  }
}
