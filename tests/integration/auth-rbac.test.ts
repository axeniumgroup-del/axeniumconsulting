import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import { GET, PATCH } from '@/app/api/admin/users/route'
import { mockSession } from '../setup/auth-mock'
import { testPrisma, resetAndSeedDB } from '../setup/db'

describe('Admin API Security', () => {
  beforeAll(async () => {
    await resetAndSeedDB()
  })

  beforeEach(() => {
    mockSession.clearSession()
  })

  describe('GET /api/admin/users', () => {
    it('should return 403 if user is not authenticated', async () => {
      const res = await GET(new Request('http://localhost/api/admin/users'))
      if (res.status === 500) {
        const body = await res.json()
        console.error('DEBUG 500 Error:', body.error)
      }
      expect(res.status).toBe(403)
      const body = await res.json()
      expect(body.error).toBe("Accès réservé à l'administration")
    })

    it('should return 403 if user is an EMPLOYEE', async () => {
      mockSession.setSession({
        user: { id: 'emp1', role: 'EMPLOYEE', email: 'emp@test.com' }
      })
      const res = await GET(new Request('http://localhost/api/admin/users'))
      expect(res.status).toBe(403)
    })

    it('should return 200 if user is an ADMIN', async () => {
      mockSession.setSession({
        user: { id: 'admin1', role: 'ADMIN', email: 'admin@test.com' }
      })
      const res = await GET(new Request('http://localhost/api/admin/users'))
      expect(res.status).toBe(200)
      const users = await res.json()
      expect(Array.isArray(users)).toBe(true)
    })
  })

  describe('PATCH /api/admin/users', () => {
    it('should return 403 if user is not an ADMIN', async () => {
      mockSession.setSession({
        user: { id: 'emp1', role: 'EMPLOYEE' }
      })
      const req = new Request('http://localhost/api/admin/users', {
        method: 'PATCH',
        body: JSON.stringify({ userId: 'some-id', role: 'ADMIN' }),
        headers: { 'Content-Type': 'application/json' }
      })
      const res = await PATCH(req)
      expect(res.status).toBe(403)
    })

    it('should allow ADMIN to update user role', async () => {
      mockSession.setSession({
        user: { id: 'admin1', role: 'ADMIN' }
      })

      const targetUser = await testPrisma.user.findFirst({
        where: { role: 'ADMIN' }
      })

      const req = new Request('http://localhost/api/admin/users', {
        method: 'PATCH',
        body: JSON.stringify({ userId: targetUser?.id, isValidated: false }),
        headers: { 'Content-Type': 'application/json' }
      })
      const res = await PATCH(req)
      expect(res.status).toBe(200)
      const user = await res.json()
      expect(user.isValidated).toBe(false)
    })
  })
})
