import { PrismaClient } from '@prisma/client';

export const resetDatabase = async (prisma: PrismaClient) => {
  console.log('✔ ✔ ✔ Reseting Database...');
  for (const {
    tablename,
  } of await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`) {
    if (tablename !== '_prisma_migrations') {
      try {
        await prisma.$queryRaw(
          `TRUNCATE TABLE "public"."${tablename}" CASCADE;`,
        );
      } catch (error) {
        console.log({ error });
      }
    }
  }
};
