/*
  Warnings:

  - Added the required column `userId` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Budget" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
