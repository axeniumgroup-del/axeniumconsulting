import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès réservé à l'administration" }, { status: 403 });
    }

    const { id } = params;
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json({ error: "Statut requis" }, { status: 400 });
    }

    const match = await prisma.match.update({
      where: { id },
      data: { status },
      include: {
        need: {
          include: { client: true }
        },
        consultant: true,
      },
    });

    if (status === "ADMIN_VALIDATED") {
      const client = match.need.client;
      const consultant = match.consultant;

      // 1. Create Conversation
      const conversation = await prisma.conversation.create({
        data: {
          type: "CLIENT_CONSULTANT",
          participants: {
            create: [
              { userId: client.id },
              { userId: consultant.id },
            ],
          },
        },
      });

      // 2. Notify Client
      await prisma.notification.create({
        data: {
          userId: client.id,
          title: "Candidature validée",
          message: `Un consultant expert a été validé pour votre besoin : ${match.need.title}`,
          type: "MATCH",
        },
      });

      // 3. Notify Consultant
      await prisma.notification.create({
        data: {
          userId: consultant.id,
          title: "Candidature validée",
          message: `Votre candidature pour le besoin "${match.need.title}" a été validée. Vous pouvez maintenant contacter le client.`,
          type: "MATCH",
        },
      });
    }

    return NextResponse.json(match);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
