import '@testing-library/jest-dom'
import { vi } from 'vitest'

// CRITICAL: Set the test database URL before any Prisma client is initialized
process.env.DATABASE_URL = 'file:./test.db'

// Clear the global prisma instance to ensure it uses the test database
if ((globalThis as any).prisma) {
  delete (globalThis as any).prisma
}

// Mock for getServerSession
export const mockSession = {
  currentUser: null as any,
  setSession: (user: any) => {
    mockSession.currentUser = user
  },
  clearSession: () => {
    mockSession.currentUser = null
  }
}

vi.mock('next-auth', async () => {
  const actual = await vi.importActual('next-auth')
  return {
    ...actual,
    getServerSession: vi.fn().mockImplementation(async () => mockSession.currentUser),
  }
})

vi.mock('next/headers', () => ({
  headers: vi.fn().mockImplementation(() => {
    return {
      get: vi.fn().mockReturnValue(null),
      has: vi.fn().mockReturnValue(false),
    };
  }),
  cookies: vi.fn().mockImplementation(() => {
    return {
      get: vi.fn().mockReturnValue(null),
      set: vi.fn(),
      delete: vi.fn(),
      getAll: vi.fn().mockReturnValue([]),
    };
  }),
}))

vi.mock('next/server', async () => {
  const actual = (await vi.importActual('next/server')) as any;
  return {
    ...actual,
    NextResponse: {
      ...actual.NextResponse,
      json: vi.fn((data, init) => ({
        status: init?.status || 200,
        json: async () => data,
      })),
    },
  }
})