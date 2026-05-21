import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = session.user.id;

    const leads = await prisma.lead.findMany({
      where: {
        employeeId: userId,
      },
      include: {
        client: { select: { name: true, email: true, phoneNumber: true } },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(leads);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await req.json();
    const { id, status, operationalNotes, value } = body;

    // Safety check: Employee can only update leads assigned to them
    const lead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!lead || lead.employeeId !== userId) {
      return NextResponse.json({ error: "Vous ne pouvez pas modifier ce lead" }, { status: 403 });
    }

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        status,
        operationalNotes,
        value: value ? parseFloat(value) : undefined,
      },
    });

    return NextResponse.json(updatedLead);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
