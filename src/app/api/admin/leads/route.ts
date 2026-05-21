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

    const leads = await prisma.lead.findMany({
      include: {
        client: { select: { name: true, email: true, phoneNumber: true } },
        assignedTo: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    // Filtering based on role: only ADMIN sees strategicSynthesis
    const filteredLeads = leads.map((lead: any) => {
      if (session.user.role !== "ADMIN") {
        const { strategicSynthesis, ...rest } = lead;
        return rest;
      }
      return lead;
    });

    return NextResponse.json(filteredLeads);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Action réservée aux administrateurs" }, { status: 403 });
    }

    const body = await req.json();
    const { clientId, employeeId, status, value, operationalNotes, strategicSynthesis } = body;

    const lead = await prisma.lead.create({
      data: {
        clientId,
        employeeId,
        status,
        value: parseFloat(value || "0"),
        operationalNotes,
        strategicSynthesis,
      },
    });

    return NextResponse.json(lead);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await req.json();
    const { id, employeeId, status, value, operationalNotes, strategicSynthesis } = body;

    // Check if user is attempting to update strategic synthesis but isn't an admin
    if (strategicSynthesis !== undefined && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Vous n'avez pas l'autorisation de modifier la synthèse stratégique" }, { status: 403 });
    }

    const lead = await prisma.lead.update({
      where: { id },
      data: {
        employeeId,
        status,
        value: parseFloat(value || "0"),
        operationalNotes,
        strategicSynthesis,
      },
    });

    return NextResponse.json(lead);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
