import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { logger } from "@/lib/logger";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Signup request body:', body);
    const { prenom, email, phone, password, role } = body;

    if (!prenom || !password || (!email && !phone)) {
      return NextResponse.json(
        { message: "Veuillez remplir tous les champs obligatoires, y compris le mot de passe" },
        { status: 400 }
      );
    }

    if (!role || !['CLIENT', 'CONSULTANT', 'ADMIN'].includes(role)) {
      return NextResponse.json(
        { message: "Veuillez sélectionner un rôle valide (Client, Consultant ou Admin)" },
        { status: 400 }
      );
    }

    const whereClause: any = {
      OR: [],
    };

    if (email) whereClause.OR.push({ email });
    if (phone) whereClause.OR.push({ phoneNumber: phone });

    const existingUser = await prisma.user.findFirst({
      where: whereClause.OR.length > 0 ? whereClause : undefined,
    });

    if (existingUser && whereClause.OR.length > 0) {
      return NextResponse.json(
        { message: "Cet email ou ce numéro de téléphone est déjà utilisé" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: prenom,
        email: email || null,
        phoneNumber: phone || null,
        password: hashedPassword,
        role: email === "batamackbatamack@gmail.com" ? "ADMIN" : role,
      },
    });

    // Notification de rappel pour compléter le profil après l'inscription
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: "Complétez votre profil",
        message: "Bienvenue sur Axenium ! Pour profiter pleinement de l'expérience, nous vous invitons à compléter les détails de votre profil.",
        type: "SYSTEM",
      },
    });

    return NextResponse.json({ message: "Compte créé avec succès", user }, { status: 201 });
  } catch (error) {
    console.error("DETAILED SIGNUP ERROR:", error);
    logger.error("Signup error", error);
    return NextResponse.json(
      { message: "Une erreur est survenue lors de la création du compte" },
      { status: 500 }
    );
  }
}
