import { UserRepo } from '@Modules/Users/repos/implementations/userRepo'
// import prisma from '@Shared/database/prisma'
import { PrismaClient } from '@prisma/client'

let userRepo: UserRepo
let prisma: PrismaClient

beforeAll(() => {
  prisma = new PrismaClient()
  jest.setTimeout(10000);
  process.env.DATABASE_URL="postgresql://prisma:prisma@localhost:5433/tests"
})

afterAll(() => {
  prisma.$disconnect()
})

beforeEach(() => {
  userRepo = new UserRepo(prisma)
})


test('it works', async () => {
  await expect(userRepo.findOne('fakeid')).resolves.toEqual(null)
})