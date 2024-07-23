/*
  Warnings:

  - Added the required column `totalPrice` to the `Command` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Command` ADD COLUMN `totalPrice` DOUBLE NOT NULL;
