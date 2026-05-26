import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function resetAndCreateAdmin() {
  try {
    console.log("Nettoyage de la base de données...");

    await prisma.match.deleteMany();
    await prisma.need.deleteMany();
    await prisma.consultantProfile.deleteMany();
    await prisma.clientProfile.deleteMany();
    await prisma.notification.deleteMany();
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.user.deleteMany();

    console.log("Base de données vidée avec succès.");

    const adminEmail = "admin@axenium.com";
    const adminPassword = "AdminPassword123!";
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = await prisma.user.create({
      data: {
        name: "Super Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log(`Super Admin créé avec succès : ${admin.email}`);
    console.log(`Mot de passe temporaire : ${adminPassword}`);
  } catch (error) {
    console.error("Erreur lors du reset :", error);
    process.exit(1);
  }
}

resetAndCreateAdmin();
