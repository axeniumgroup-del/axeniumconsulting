import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Email sending disabled
    console.log(`OTP pour ${email}: ${otp}`);

    return NextResponse.json({ success: true, otp }); // On renvoie l'OTP ici pour le test
  } catch (error: any) {
    logger.error("Verify Email error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
