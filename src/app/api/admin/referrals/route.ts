import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès réservé à l'administration" }, { status: 403 });
    }

    const referrals = await prisma.referral.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(referrals);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
