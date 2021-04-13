/*
  Warnings:

  - You are about to drop the column `balance` on the `Account` table. All the data in the column will be lost.
  - Added the required column `startingBalance` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "balance",
ADD COLUMN     "startingBalance" INTEGER NOT NULL,
ADD COLUMN     "bankName" TEXT;
