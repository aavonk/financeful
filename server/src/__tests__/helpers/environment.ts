import { PrismaClient } from "@prisma/client"

export const setupEnv = () => {
  process.env.DATABASE_URL="postgresql://prisma:prisma@localhost:5433/tests"
  process.env.JWT_EXP='1d'
  process.env.JWT_SECRET='supersecret'
}

export const resetDatabase = async (prisma: PrismaClient) => {
  console.log('✔ ✔ ✔ Reseting Database...')
  for (const {
    tablename,
  } of await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`) {

      if (tablename !== '_prisma_migrations') {
        try {
          await prisma.$queryRaw(`TRUNCATE TABLE "public"."${tablename}" CASCADE;`);
        } catch (error) {
          console.log({error})
        }
    }
  }
}