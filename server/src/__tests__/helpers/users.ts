import { PrismaClient } from '@prisma/client'

export const userCreateData = {
  email: 'testing@test.com',
  password: 'password',
  displayName: 'User Testing',
  firstName: 'User'
}

export const createUser = async (prisma: PrismaClient) => {
  return await prisma.user.create({
    data: {
      ...userCreateData
    }
  })
}

export const deleteUsers = async (prisma: PrismaClient) => {
  return await prisma.user.deleteMany()
}