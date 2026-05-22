import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'
import path from 'path'

const prisma = new PrismaClient()

export async function resetAndSeedDB() {
  console.log('Resetting test database...')

  const env = {
    ...process.env,
    DATABASE_URL: 'file:./test.db'
  }

  try {
    execSync('npx prisma db push --force-reset', {
      stdio: 'inherit',
      env
    })

    execSync('npx tsx prisma/seed.ts', {
      stdio: 'inherit',
      env
    })

    console.log('Test database reset and seeded successfully.')
  } catch (error) {
    console.error('Failed to reset and seed test database:', error)
    throw error
  }
}

export { prisma as testPrisma }