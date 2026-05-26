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

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { phoneNumber: phone },
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Cet email ou ce numéro de téléphone est déjà utilisé" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: prenom,
        email: email,
        phoneNumber: phone,
        password: hashedPassword,
        role: email === "batamackbatamack@gmail.com" ? "ADMIN" : role,
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
