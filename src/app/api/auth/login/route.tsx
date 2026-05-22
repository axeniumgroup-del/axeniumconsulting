import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { logger } from "@/lib/logger";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email et mot de passe requis" }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { phoneNumber: email },
        ],
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 401 });
    }

    const isPasswordCorrect = user.password
      ? await bcrypt.compare(password, user.password)
      : password === "password123"; // Fallback for existing users without hashed passwords

    if (!isPasswordCorrect) {
      const newFailures = (user.failedLoginAttempts || 0) + 1;

      await prisma.user.update({
        where: { id: user.id },
        data: { failedLoginAttempts: newFailures },
      });

      if (newFailures >= 10) {
        // Reset attempts after lockout threshold reached (Email disabled)
        await prisma.user.update({
          where: { id: user.id },
          data: { failedLoginAttempts: 0 },
        });
      }

      return NextResponse.json({ message: "Mot de passe incorrect" }, { status: 401 });
    }

    // Password correct: reset failures
    await prisma.user.update({
      where: { id: user.id },
      data: { failedLoginAttempts: 0 },
    });

    return NextResponse.json({ message: "Authentification réussie", user }, { status: 200 });

  } catch (error) {
    logger.error("Login error", error);
    return NextResponse.json({ message: "Une erreur est survenue" }, { status: 500 });
  }
}
