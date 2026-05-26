import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Vous devez être connecté pour acheter un ticket" }, { status: 401 });
    }

    const { eventId } = await req.json();
    if (!eventId) {
      return NextResponse.json({ error: "ID de l'événement requis" }, { status: 400 });
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json({ error: "Événement non trouvé" }, { status: 404 });
    }

    // Simulation de paiement : On considère que c'est payé si c'est gratuit ou si le flux est simplifié
    // Dans une version réelle, on intégrerait Stripe/Momo ici.

    const qrCode = `AX-${nanoid(12).toUpperCase()}`;

    const ticket = await prisma.ticket.create({
      data: {
        eventId,
        userId: session.user.id,
        qrCode,
        status: "VALID",
      },
    });

    return NextResponse.json(ticket);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
