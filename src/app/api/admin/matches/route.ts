import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès réservé à l'administration" }, { status: 403 });
    }

    const matches = await prisma.match.findMany({
      include: {
        need: {
          include: { client: true }
        },
        consultant: true,
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(matches);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
