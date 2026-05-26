"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { calculateCompatibilityScore } from "@/lib/matching";
import { revalidatePath } from "next/cache";

export async function saveConsultantProfile(data: {
  bio: string;
  dailyRate: number;
  yearsExperience: number;
  portfolioUrl: string;
  skills: string[];
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Non authentifié");
  }

  const userId = session.user.id;

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

    const profile = await prisma.consultantProfile.upsert({
      where: { userId: userId },
      update: {
        bio: data.bio,
        dailyRate: data.dailyRate,
        yearsExperience: data.yearsExperience,
        portfolioUrl: data.portfolioUrl,
        skills: {
          set: skillRecords,
        },
      },
      create: {
        userId: userId,
        bio: data.bio,
        dailyRate: data.dailyRate,
        yearsExperience: data.yearsExperience,
        portfolioUrl: data.portfolioUrl,
        skills: {
          connect: skillRecords.map((s) => ({ id: s.id })),
        },
      },
    });

    revalidatePath("/consultant/onboarding");
    revalidatePath("/consultant");

    return { success: true, profile };
  } catch (error) {
    console.error("Error saving consultant profile:", error);
    return { success: false, error: "Une erreur est survenue lors de la sauvegarde du profil" };
  }
}

export async function applyToNeed(needId: string, message: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Non authentifié");
  }

  const consultantId = session.user.id;

  try {
    const existingMatch = await prisma.match.findFirst({
      where: {
        needId,
        consultantId,
      },
    });

    if (existingMatch) {
      return { success: false, error: "Vous avez déjà postulé à cette mission" };
    }

    const score = await calculateCompatibilityScore(needId, consultantId);

    const match = await prisma.match.create({
      data: {
        needId,
        consultantId,
        message,
        status: "PENDING",
        compatibilityScore: score,
      },
    });

    revalidatePath("/consultant/needs");
    revalidatePath(`/consultant/needs/${needId}`);

    return { success: true, match };
  } catch (error) {
    console.error("Error applying to need:", error);
    return { success: false, error: "Une erreur est survenue lors de l'envoi de votre candidature" };
  }
}
