/*
  Warnings:

  - You are about to drop the column `role` on the `Users` table. All the data in the column will be lost.
  - Added the required column `idRole` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Users` DROP FOREIGN KEY `Users_role_fkey`;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `role`,
    ADD COLUMN `idRole` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_idRole_fkey` FOREIGN KEY (`idRole`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
