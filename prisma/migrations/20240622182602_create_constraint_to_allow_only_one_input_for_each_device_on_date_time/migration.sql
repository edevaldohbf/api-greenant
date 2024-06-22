/*
  Warnings:

  - A unique constraint covering the columns `[deviceId,timestamp]` on the table `DeviceMeasurementsDay` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[deviceId,timestamp]` on the table `DeviceMeasurementsHour` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[deviceId,timestamp]` on the table `DeviceMeasurementsRaw` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DeviceMeasurementsDay_deviceId_timestamp_key" ON "DeviceMeasurementsDay"("deviceId", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceMeasurementsHour_deviceId_timestamp_key" ON "DeviceMeasurementsHour"("deviceId", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceMeasurementsRaw_deviceId_timestamp_key" ON "DeviceMeasurementsRaw"("deviceId", "timestamp");
