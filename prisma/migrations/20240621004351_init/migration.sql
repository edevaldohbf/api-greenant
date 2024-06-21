-- CreateTable
CREATE TABLE "device_measurements_raw" (
    "id" SERIAL NOT NULL,
    "device_id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "active_energy" INTEGER NOT NULL,
    "active_power" INTEGER NOT NULL,

    CONSTRAINT "device_measurements_raw_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device_measurements_hour" (
    "id" SERIAL NOT NULL,
    "device_id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "active_energy" INTEGER NOT NULL,
    "active_power" INTEGER NOT NULL,

    CONSTRAINT "device_measurements_hour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device_measurements_day" (
    "id" SERIAL NOT NULL,
    "device_id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "active_energy" INTEGER NOT NULL,
    "active_power" INTEGER NOT NULL,

    CONSTRAINT "device_measurements_day_pkey" PRIMARY KEY ("id")
);
