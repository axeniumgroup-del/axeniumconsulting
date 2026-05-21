import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({});

async function main() {
  const adminEmail = 'batamackbatamack@gmail.com'

  const user = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: 'ADMIN',
      isValidated: true,
    },
    create: {
      email: adminEmail,
      role: 'ADMIN',
      isValidated: true,
      name: 'Batamack',
    },
  })

  console.log('Super Admin initialized:', user.email)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
