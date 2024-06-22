/*
  Warnings:

  - You are about to drop the column `active_energy` on the `DeviceMeasurementsDay` table. All the data in the column will be lost.
  - You are about to drop the column `active_power` on the `DeviceMeasurementsDay` table. All the data in the column will be lost.
  - You are about to drop the column `device_id` on the `DeviceMeasurementsDay` table. All the data in the column will be lost.
  - You are about to drop the column `active_energy` on the `DeviceMeasurementsHour` table. All the data in the column will be lost.
  - You are about to drop the column `active_power` on the `DeviceMeasurementsHour` table. All the data in the column will be lost.
  - You are about to drop the column `device_id` on the `DeviceMeasurementsHour` table. All the data in the column will be lost.
  - Added the required column `activeEnergy` to the `DeviceMeasurementsDay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activePower` to the `DeviceMeasurementsDay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceId` to the `DeviceMeasurementsDay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activeEnergy` to the `DeviceMeasurementsHour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activePower` to the `DeviceMeasurementsHour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceId` to the `DeviceMeasurementsHour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeviceMeasurementsDay" DROP COLUMN "active_energy",
DROP COLUMN "active_power",
DROP COLUMN "device_id",
ADD COLUMN     "activeEnergy" INTEGER NOT NULL,
ADD COLUMN     "activePower" INTEGER NOT NULL,
ADD COLUMN     "deviceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DeviceMeasurementsHour" DROP COLUMN "active_energy",
DROP COLUMN "active_power",
DROP COLUMN "device_id",
ADD COLUMN     "activeEnergy" INTEGER NOT NULL,
ADD COLUMN     "activePower" INTEGER NOT NULL,
ADD COLUMN     "deviceId" TEXT NOT NULL;
