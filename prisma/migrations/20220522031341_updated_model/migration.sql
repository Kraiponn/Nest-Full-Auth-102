/*
  Warnings:

  - You are about to drop the column `rtHash` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "rtHash",
ADD COLUMN     "hashedRt" TEXT;
