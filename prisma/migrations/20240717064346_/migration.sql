/*
  Warnings:

  - Added the required column `idUser` to the `Command` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Command` ADD COLUMN `idUser` VARCHAR(191) NOT NULL;
