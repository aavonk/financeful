/*
  Warnings:

  - You are about to alter the column `amount` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The migration will add a unique constraint covering the columns `[email]` on the table `User`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
