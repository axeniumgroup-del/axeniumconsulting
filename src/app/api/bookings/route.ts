import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await req.json();
    const { date, time } = body;

    if (!date || !time) {
      return NextResponse.json({ error: "Date et heure requises" }, { status: 400 });
    }

    // 1. Trouver l'expert assigné au client (ou le Super Admin par défaut)
    const lead = await prisma.lead.findFirst({
      where: { clientId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    const expertId = lead?.employeeId || (await prisma.user.findFirst({
      where: { role: "ADMIN" }
    }))?.id;

    if (!expertId) {
      return NextResponse.json({ error: "Aucun expert disponible pour le moment" }, { status: 500 });
    }

    // 2. Créer la réservation
    const booking = await prisma.booking.create({
      data: {
        date: new Date(`${date}T${time}:00`),
        clientId: session.user.id,
        expertId: expertId,
        status: "PENDING",
      },
    });

    return NextResponse.json(booking);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
