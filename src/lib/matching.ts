import { prisma } from "./prisma";

export async function calculateCompatibilityScore(needId: string, consultantId: string): Promise<number> {
  const need = await prisma.need.findUnique({
    where: { id: needId },
    include: { skills: true }
  });

  const consultantProfile = await prisma.consultantProfile.findUnique({
    where: { userId: consultantId },
    include: { skills: true }
  });

  if (!need || !consultantProfile) return 0;

  const needSkills = new Set(need.skills.map(s => s.name.trim().toLowerCase()));
  const consultantSkills = new Set(consultantProfile.skills.map(s => s.name.trim().toLowerCase()));

  const matchedSkills = [...needSkills].filter(skill => consultantSkills.has(skill));
  
  if (needSkills.size === 0) return 100;
  
  return Math.round((matchedSkills.length / needSkills.size) * 100);
}

