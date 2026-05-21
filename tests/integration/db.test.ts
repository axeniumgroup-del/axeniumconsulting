import { describe, it, expect, beforeAll } from 'vitest'
import { testPrisma, resetAndSeedDB } from '../setup/db'

describe('Database Integration', () => {
  beforeAll(async () => {
    await resetAndSeedDB()
  })

  it('should connect to the test database and retrieve the super admin', async () => {
    const admin = await testPrisma.user.findFirst({
      where: { role: 'ADMIN' }
    })
    expect(admin).toBeDefined()
    expect(admin?.email).toBe('batamackbatamack@gmail.com')
  })
})
