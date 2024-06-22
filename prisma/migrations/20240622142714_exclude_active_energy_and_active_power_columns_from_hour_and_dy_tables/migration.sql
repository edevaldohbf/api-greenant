/*
  Warnings:

  - You are about to drop the column `activeEnergy` on the `DeviceMeasurementsDay` table. All the data in the column will be lost.
  - You are about to drop the column `activePower` on the `DeviceMeasurementsDay` table. All the data in the column will be lost.
  - You are about to drop the column `activeEnergy` on the `DeviceMeasurementsHour` table. All the data in the column will be lost.
  - You are about to drop the column `activePower` on the `DeviceMeasurementsHour` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DeviceMeasurementsDay" DROP COLUMN "activeEnergy",
DROP COLUMN "activePower";

-- AlterTable
ALTER TABLE "DeviceMeasurementsHour" DROP COLUMN "activeEnergy",
DROP COLUMN "activePower";
