/*
  Warnings:

  - Made the column `userId` on table `cart` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "cart" ALTER COLUMN "userId" SET NOT NULL;
