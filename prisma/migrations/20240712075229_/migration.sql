/*
  Warnings:

  - A unique constraint covering the columns `[nameRole]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Role_nameRole_key` ON `Role`(`nameRole`);
