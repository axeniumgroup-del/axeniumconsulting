import { describe, it, expect, beforeAll, vi } from 'vitest';
import { testPrisma } from '../setup/db';
import { POST } from '../../src/app/api/auth/signup/route';
import { NextRequest, NextResponse } from 'next/server';

// Mock Resend
vi.mock('resend', () => {
  return {
    Resend: class {
      emails = {
        send: vi.fn().mockResolvedValue({ data: { id: 'mock-id' } }),
      };
    },
  };
});

describe('Signup API Integration', () => {
  beforeAll(async () => {
    await testPrisma.user.deleteMany({});
  });

  it('should create a new user successfully', async () => {
    const body = {
      prenom: 'Jean Dupont',
      email: 'jean@example.com',
      phone: '+237600000000',
    };

    const req = new NextRequest('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.user).toBeDefined();
    expect(data.user.email).toBe('jean@example.com');

    const dbUser = await testPrisma.user.findUnique({
      where: { email: 'jean@example.com' },
    });
    expect(dbUser).toBeDefined();
    expect(dbUser?.name).toBe('Jean Dupont');
  }, 10000);

  it('should fail if email already exists', async () => {
    const body = {
      prenom: 'Jean Duplicate',
      email: 'jean@example.com',
      phone: '+237111111111',
    };

    const req = new NextRequest('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toContain('déjà utilisé');
  }, 10000);

  it('should fail if required fields are missing', async () => {
    const body = {
      prenom: 'Incomplete',
    };

    const req = new NextRequest('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);
  }, 10000);
});
