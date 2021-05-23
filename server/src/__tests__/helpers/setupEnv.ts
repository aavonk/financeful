export const setupEnv = () => {
  process.env.DATABASE_URL="postgresql://prisma:prisma@localhost:5433/tests"
}