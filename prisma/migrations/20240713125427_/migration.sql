/*
  Warnings:

  - Added the required column `container` to the `Command` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Command` ADD COLUMN `container` VARCHAR(191) NOT NULL;
