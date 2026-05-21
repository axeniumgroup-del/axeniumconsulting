import { describe, it, expect, vi } from 'vitest'
import { middlewareLogic } from '@/middleware'
import { NextResponse } from 'next/server'

vi.mock('next/server', () => {
  return {
    NextResponse: {
      next: vi.fn(() => ({ status: 'next' })),
      rewrite: vi.fn((url) => ({ status: 'rewrite', url: url.toString() })),
      redirect: vi.fn((url) => ({ status: 'redirect', url: url.toString() })),
    },
  }
})

describe('Middleware RBAC Logic', () => {
  const createReq = (path: string, role: string | null) => ({
    nextUrl: { pathname: path },
    url: 'http://localhost' + path,
    nextauth: { token: role ? { role } : null },
  })

  it('should allow ADMIN to access /admin', () => {
    const req = createReq('/admin/users', 'ADMIN')
    const res = middlewareLogic(req)
    expect(res.status).toBe('next')
  })

  it('should rewrite to /unauthorized if EMPLOYEE tries to access /admin', () => {
    const req = createReq('/admin/users', 'EMPLOYEE')
    const res = middlewareLogic(req)
    expect(res.status).toBe('rewrite')
    expect(res.url).toContain('/unauthorized')
  })

  it('should allow ADMIN to access /employee', () => {
    const req = createReq('/employee/dashboard', 'ADMIN')
    const res = middlewareLogic(req)
    expect(res.status).toBe('next')
  })

  it('should allow EMPLOYEE to access /employee', () => {
    const req = createReq('/employee/dashboard', 'EMPLOYEE')
    const res = middlewareLogic(req)
    expect(res.status).toBe('next')
  })

  it('should rewrite to /unauthorized if CLIENT tries to access /employee', () => {
    const req = createReq('/employee/dashboard', 'CLIENT')
    const res = middlewareLogic(req)
    expect(res.status).toBe('rewrite')
    expect(res.url).toContain('/unauthorized')
  })

  it('should allow authenticated user to access /client', () => {
    const req = createReq('/client/book', 'CLIENT')
    const res = middlewareLogic(req)
    expect(res.status).toBe('next')
  })

  it('should redirect to /login if unauthenticated user tries to access /client', () => {
    const req = createReq('/client/book', null)
    const res = middlewareLogic(req)
    expect(res.status).toBe('redirect')
    expect(res.url).toContain('/login')
  })
})
