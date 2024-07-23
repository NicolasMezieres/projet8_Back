/*
  Warnings:

  - You are about to drop the column `idcart` on the `CartHasProduct` table. All the data in the column will be lost.
  - Added the required column `idCart` to the `CartHasProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CartHasProduct` DROP FOREIGN KEY `CartHasProduct_idcart_fkey`;

-- AlterTable
ALTER TABLE `CartHasProduct` DROP COLUMN `idcart`,
    ADD COLUMN `idCart` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `CartHasProduct` ADD CONSTRAINT `CartHasProduct_idCart_fkey` FOREIGN KEY (`idCart`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
