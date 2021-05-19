import { mockDeep, mockReset, MockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import prisma from './shared/database/prisma';

jest.mock('./shared/database/prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = (prisma as unknown) as MockProxy<PrismaClient>;
