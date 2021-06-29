/*
  Warnings:

  - You are about to drop the column `budget` on the `BudgetItem` table. All the data in the column will be lost.
  - Added the required column `budgetAmount` to the `BudgetItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BudgetItem" DROP COLUMN "budget",
ADD COLUMN     "budgetAmount" INTEGER NOT NULL;
