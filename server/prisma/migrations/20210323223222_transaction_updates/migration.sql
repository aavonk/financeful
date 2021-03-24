-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "isCashIn" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isCashOut" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isUncategorized" BOOLEAN NOT NULL DEFAULT true;
