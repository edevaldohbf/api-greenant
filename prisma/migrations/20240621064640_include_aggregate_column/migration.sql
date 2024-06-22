-- AlterTable
ALTER TABLE "DeviceMeasurementsDay" ADD COLUMN     "aggregateCount" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "DeviceMeasurementsHour" ADD COLUMN     "aggregateCount" INTEGER DEFAULT 0;
