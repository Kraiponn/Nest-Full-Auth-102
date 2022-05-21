/*
  Warnings:

  - You are about to drop the column `refreshRt` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "refreshRt",
ADD COLUMN     "rtHash" TEXT;
