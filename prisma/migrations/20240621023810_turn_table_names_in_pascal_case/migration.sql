/*
  Warnings:

  - You are about to drop the `device_measurements_day` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `device_measurements_hour` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `device_measurements_raw` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "device_measurements_day";

-- DropTable
DROP TABLE "device_measurements_hour";

-- DropTable
DROP TABLE "device_measurements_raw";

-- CreateTable
CREATE TABLE "DeviceMeasurementsRaw" (
    "id" SERIAL NOT NULL,
    "device_id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "active_energy" INTEGER NOT NULL,
    "active_power" INTEGER NOT NULL,

    CONSTRAINT "DeviceMeasurementsRaw_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceMeasurementsHour" (
    "id" SERIAL NOT NULL,
    "device_id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "active_energy" INTEGER NOT NULL,
    "active_power" INTEGER NOT NULL,

    CONSTRAINT "DeviceMeasurementsHour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceMeasurementsDay" (
    "id" SERIAL NOT NULL,
    "device_id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "active_energy" INTEGER NOT NULL,
    "active_power" INTEGER NOT NULL,

    CONSTRAINT "DeviceMeasurementsDay_pkey" PRIMARY KEY ("id")
);
