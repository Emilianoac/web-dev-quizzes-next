-- CreateEnum
CREATE TYPE "Level" AS ENUM ('basico', 'intermedio', 'avanzado');

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "level" TEXT NOT NULL DEFAULT 'basico';
