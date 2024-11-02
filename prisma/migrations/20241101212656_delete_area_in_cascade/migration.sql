-- DropForeignKey
ALTER TABLE "Technology" DROP CONSTRAINT "Technology_areaId_fkey";

-- AddForeignKey
ALTER TABLE "Technology" ADD CONSTRAINT "Technology_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE CASCADE ON UPDATE CASCADE;
