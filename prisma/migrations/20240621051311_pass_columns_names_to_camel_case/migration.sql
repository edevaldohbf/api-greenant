/*
  Warnings:

  - You are about to drop the column `active_energy` on the `DeviceMeasurementsRaw` table. All the data in the column will be lost.
  - You are about to drop the column `active_power` on the `DeviceMeasurementsRaw` table. All the data in the column will be lost.
  - You are about to drop the column `device_id` on the `DeviceMeasurementsRaw` table. All the data in the column will be lost.
  - Added the required column `activeEnergy` to the `DeviceMeasurementsRaw` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activePower` to the `DeviceMeasurementsRaw` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceId` to the `DeviceMeasurementsRaw` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeviceMeasurementsRaw" DROP COLUMN "active_energy",
DROP COLUMN "active_power",
DROP COLUMN "device_id",
ADD COLUMN     "activeEnergy" INTEGER NOT NULL,
ADD COLUMN     "activePower" INTEGER NOT NULL,
ADD COLUMN     "deviceId" TEXT NOT NULL;
