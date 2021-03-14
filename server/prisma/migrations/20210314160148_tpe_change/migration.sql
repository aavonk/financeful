/*
  Warnings:

  - You are about to alter the column `type` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `Enum("Type")` to `Text`.

*/
-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "type" SET DATA TYPE TEXT;

-- DropEnum
DROP TYPE "Type";
