import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

// Email disabled

export async function GET() {
  try {
    // On récupère les leads qui n'ont pas été contactés récemment
    // et qui sont encore dans le tunnel (ex: NEW, CONTACTED)
    const staleLeads = await prisma.lead.findMany({
      where: {
        status: { in: ["NEW", "CONTACTED", "QUALIFIED"] },
        OR: [
          { lastContactAt: null },
          {
            lastContactAt: {
              lt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // Plus de 3 jours sans contact
            },
          },
        ],
      },
      include: { client: true },
    });

    console.log(`Checking for stale leads... Found ${staleLeads.length}`);

    const results = await Promise.all(
      staleLeads.map(async (lead: any) => {
        const nextLevel = (lead.followUpLevel || 0) + 1;
        if (nextLevel > 3) return { id: lead.id, status: "skipped" };

        // Email sending disabled

        // Mise à jour du lead pour tracker la relance
        await prisma.lead.update({
          where: { id: lead.id },
          data: {
            followUpLevel: nextLevel,
            lastContactAt: new Date(),
          },
        });

        return { id: lead.id, status: "sent-simulated" };
      })
    );

    return NextResponse.json({
      processed: results.length,
      details: results,
    });
  } catch (error: any) {
    logger.error("Cron Error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
