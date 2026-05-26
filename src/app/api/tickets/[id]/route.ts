import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { id } = params;

    const ticket = await prisma.ticket.findUnique({
      where: { id },
      include: {
        user: true,
        event: true,
      },
    });

    if (!ticket) {
      return NextResponse.json({ error: "Ticket non trouvé" }, { status: 404 });
    }

    // Sécurité : Seul le propriétaire du ticket peut le voir
    if (ticket.userId !== session.user.id) {
      return NextResponse.json({ error: "Accès non autorisé à ce ticket" }, { status: 403 });
    }

    return NextResponse.json(ticket);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
