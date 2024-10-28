/*
  Warnings:

  - Added the required column `iconName` to the `Technology` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Technology" ADD COLUMN     "iconName" TEXT NOT NULL;
