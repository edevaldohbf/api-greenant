/*
  Warnings:

  - You are about to drop the column `activeEnergySum` on the `DeviceMeasurementsDay` table. All the data in the column will be lost.
  - You are about to drop the column `activePowerSum` on the `DeviceMeasurementsDay` table. All the data in the column will be lost.
  - You are about to drop the column `activeEnergySum` on the `DeviceMeasurementsHour` table. All the data in the column will be lost.
  - You are about to drop the column `activePowerSum` on the `DeviceMeasurementsHour` table. All the data in the column will be lost.
  - Added the required column `activeEnergy` to the `DeviceMeasurementsDay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activePower` to the `DeviceMeasurementsDay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activeEnergy` to the `DeviceMeasurementsHour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activePower` to the `DeviceMeasurementsHour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeviceMeasurementsDay" DROP COLUMN "activeEnergySum",
DROP COLUMN "activePowerSum",
ADD COLUMN     "activeEnergy" INTEGER NOT NULL,
ADD COLUMN     "activePower" INTEGER NOT NULL,
ALTER COLUMN "activeEnergyAvg" DROP NOT NULL,
ALTER COLUMN "activeEnergyAvg" SET DEFAULT 0,
ALTER COLUMN "activePowerAvg" DROP NOT NULL,
ALTER COLUMN "activePowerAvg" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "DeviceMeasurementsHour" DROP COLUMN "activeEnergySum",
DROP COLUMN "activePowerSum",
ADD COLUMN     "activeEnergy" INTEGER NOT NULL,
ADD COLUMN     "activePower" INTEGER NOT NULL,
ALTER COLUMN "activeEnergyAvg" DROP NOT NULL,
ALTER COLUMN "activeEnergyAvg" SET DEFAULT 0,
ALTER COLUMN "activePowerAvg" DROP NOT NULL,
ALTER COLUMN "activePowerAvg" SET DEFAULT 0;
