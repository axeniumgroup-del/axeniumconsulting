const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'batamackbatamack@gmail.com';

  console.log('Initializing Super Admin...');
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: 'ADMIN', isValidated: true },
    create: {
      email: adminEmail,
      role: 'ADMIN',
      isValidated: true,
      name: 'Batamack',
    },
  });

  console.log('Initializing Site Settings...');
  await prisma.settings.upsert({
    where: { id: 'global' },
    update: { adminPhoneNumber: '+237696022056' },
    create: {
      id: 'global',
      adminPhoneNumber: '+237696022056',
    },
  });

  console.log('Seeding completed successfully.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
al
