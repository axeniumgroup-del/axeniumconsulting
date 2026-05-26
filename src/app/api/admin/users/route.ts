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

    const users = await prisma.user.findMany({
      include: {
        _count: {
          select: {
            notifications: true,
            needsCreated: true,
            matchesAppliedTo: true
          }
        }
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès réservé à l'administration" }, { status: 403 });
    }

    const body = await req.json();
    const { userId, role, isValidated, canUploadCV } = body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(role && { role }),
        ...(isValidated !== undefined && { isValidated }),
        ...(canUploadCV !== undefined && { canUploadCV }),
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
