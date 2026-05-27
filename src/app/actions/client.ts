"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createNeed(data: {
  title: string;
  description: string;
  budget: number;
  deadline: Date;
  skills: string[];
}) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Non authentifié");
  }

  const clientId = session.user.id;

  try {
    const skillRecords = await Promise.all(
      data.skills.map(async (skillName) => {
        const skill = await prisma.skill.upsert({
          where: { name: skillName.trim().toLowerCase() },
          update: {},
          create: { name: skillName.trim().toLowerCase() },
        });
        return skill;
      })
    );

    const need = await prisma.need.create({
      data: {
        clientId: clientId,
        title: data.title,
        description: data.description,
        budget: data.budget,
        deadline: data.deadline,
        skills: {
          connect: skillRecords.map((s) => ({ id: s.id })),
        },
      },
    });

    revalidatePath("/client/needs");
    revalidatePath("/client");

    return { success: true, need };
  } catch (error) {
    console.error("Error creating need:", error);
    return { success: false, error: "Une erreur est survenue lors de la création du besoin" };
  }
}

export async function updateMatchStatus(matchId: string, status: "ACCEPTED" | "REJECTED") {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Non authentifié");
  }

  try {
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: { need: true },
    });

    if (!match || match.need.clientId !== session.user.id) {
      return { success: false, error: "Action non autorisée" };
    }

    await prisma.match.update({
      where: { id: matchId },
      data: { status },
    });

    revalidatePath(`/client/needs/${match.needId}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating match status:", error);
    return { success: false, error: "Une erreur est survenue lors de la mise à jour" };
  }
}
