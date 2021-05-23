import { PrismaClient } from '@prisma/client'


const accountInput = {
  accountName: 'Primary Checking',
  accountType: 'Checking Account',
  balance: 0,
  bankName: 'Bank of Banks',
  isAsset: true,
  isLiability: false
}
export const createAccount = async (prisma: PrismaClient, userId: string) => {
  return await prisma.account.create({
    data: {
      ...accountInput,
      userId
    }
  })
}

export const getAccount = async (prisma: PrismaClient, accountId: string) => {
  return await prisma.account.findUnique({
    where: {
      id: accountId
    }
  })
}