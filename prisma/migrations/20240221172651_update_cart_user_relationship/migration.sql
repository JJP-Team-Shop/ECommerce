-- DropIndex
DROP INDEX "cart_userId_key";

-- AlterTable
ALTER TABLE "cart" ALTER COLUMN "userId" DROP NOT NULL;
