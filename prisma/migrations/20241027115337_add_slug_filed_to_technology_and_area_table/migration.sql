/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Area` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Technology` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Technology` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Area" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Technology" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Area_slug_key" ON "Area"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Technology_slug_key" ON "Technology"("slug");