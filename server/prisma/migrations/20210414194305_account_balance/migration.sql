/*
  Warnings:

  - You are about to drop the column `startingBalance` on the `Account` table. All the data in the column will be lost.
  - Added the required column `balance` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "startingBalance",
ADD COLUMN     "balance" INTEGER NOT NULL;
