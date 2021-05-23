import { UserRepo } from '@Modules/Users/repos/implementations/userRepo'
import { PrismaClient } from '@prisma/client'
import { setupEnv } from '../helpers/setupEnv'


let userRepo: UserRepo
let prisma: PrismaClient

beforeAll(() => {
  setupEnv()
  prisma = new PrismaClient()
  jest.setTimeout(10000);
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