-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_userId_fkey";

-- DropIndex
DROP INDEX "cart_userId_key";

-- AlterTable
ALTER TABLE "cart" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "cartId" INTEGER;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
