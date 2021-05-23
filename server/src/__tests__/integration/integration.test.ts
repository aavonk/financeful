import { UserRepo } from '@Modules/Users/repos/implementations/userRepo'
import prisma from '@Shared/database/prisma'

let userRepo: UserRepo

beforeAll(() => {
  jest.setTimeout(10000);
})

beforeEach(() => {
  userRepo = new UserRepo(prisma)
})


test('it works', async () => {
  await expect(userRepo.findOne('fakeid')).resolves.toEqual(null)
})