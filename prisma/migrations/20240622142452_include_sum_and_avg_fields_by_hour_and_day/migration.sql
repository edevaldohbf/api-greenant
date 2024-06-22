/*
  Warnings:

  - Added the required column `activeEnergyAvg` to the `DeviceMeasurementsDay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activeEnergySum` to the `DeviceMeasurementsDay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activePowerAvg` to the `DeviceMeasurementsDay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activePowerSum` to the `DeviceMeasurementsDay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activeEnergyAvg` to the `DeviceMeasurementsHour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activeEnergySum` to the `DeviceMeasurementsHour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activePowerAvg` to the `DeviceMeasurementsHour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activePowerSum` to the `DeviceMeasurementsHour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeviceMeasurementsDay" ADD COLUMN     "activeEnergyAvg" INTEGER NOT NULL,
ADD COLUMN     "activeEnergySum" INTEGER NOT NULL,
ADD COLUMN     "activePowerAvg" INTEGER NOT NULL,
ADD COLUMN     "activePowerSum" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "DeviceMeasurementsHour" ADD COLUMN     "activeEnergyAvg" INTEGER NOT NULL,
ADD COLUMN     "activeEnergySum" INTEGER NOT NULL,
ADD COLUMN     "activePowerAvg" INTEGER NOT NULL,
ADD COLUMN     "activePowerSum" INTEGER NOT NULL;
