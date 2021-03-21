// When seeding the db make sure to replace the userID in the seed data as the
// user account may have been deleted during a migration 
// and might not exist. 
import {PrismaClient} from '@prisma/client'
import { accounts} from './seed-data/accounts'
import {categories} from './seed-data/categories'

const prisma = new PrismaClient()

async function main() {
  for (let account of accounts) {
    await prisma.account.create({
      data: account
    })
  }

  for (let category of categories) {
    await prisma.category.create({
      data: category
    })
  }
}

main().catch(e => {
  console.log(e.message)
  process.exit(1)
}).finally(() => {
  prisma.$disconnect()
})