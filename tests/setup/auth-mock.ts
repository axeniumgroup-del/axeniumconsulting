import { vi } from 'vitest'

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
  headers: vi.fn().mockReturnValue(new Map()),
  cookies: vi.fn().mockReturnValue({
    get: vi.fn(),
    set: vi.fn(),
    delete: vi.fn(),
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
