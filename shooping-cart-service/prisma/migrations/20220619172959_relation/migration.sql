/*
  Warnings:

  - Added the required column `consumerId` to the `PRODUCT` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PRODUCT` ADD COLUMN `consumerId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `PRODUCT` ADD CONSTRAINT `PRODUCT_consumerId_fkey` FOREIGN KEY (`consumerId`) REFERENCES `CONSUMER`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
