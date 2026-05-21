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
    const { referredEmail, referredName } = body;

    if (!referredEmail) {
      return NextResponse.json({ error: "L'email du contact référé est requis" }, { status: 400 });
    }

    const referrerId = session.user.id;

    const referral = await prisma.referral.create({
      data: {
        referrerId,
        referredEmail,
        referredName,
        status: "PENDING",
      },
    });

    return NextResponse.json(referral);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = session.user.id;

    const referrals = await prisma.referral.findMany({
      where: { referrerId: userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(referrals);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
