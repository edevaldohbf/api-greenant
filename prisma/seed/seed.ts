import { PrismaClient } from '@prisma/client';
import * as measurementDataJson from './measurement-data.json';

const prisma = new PrismaClient();

async function main() {
  // Erasing old data
  const tableNames = [
    'DeviceMeasurementsRaw',
    'DeviceMeasurementsHour',
    'DeviceMeasurementsDay',
  ];
  for (const tableName of tableNames)
    await prisma.$queryRawUnsafe(
      `Truncate "${tableName}" restart identity cascade;`,
    );

  // Adding new data
  for (const measurement of measurementDataJson.measurementData) {
    let deviceId = '';

    // Sanization of data
    if (measurement['id-dispositivo']) {
      deviceId = measurement['id-dispositivo'];
    } else if (measurement['uid']) {
      deviceId = measurement['uid'];
    } else {
      break;
    }

    const data = {
      deviceId: deviceId,
      timestamp: new Date(measurement.timestamp),
      activeEnergy: measurement.activeEnergy,
      activePower: measurement.activePower,
    };

    // Create measurement raw
    await prisma.deviceMeasurementsRaw.create({
      data,
    });

    console.log(
      'Create Measurements Raw - ',
      data.deviceId,
      ' - ',
      data.timestamp,
    );

    // Create or Update measurement Hour
    data.timestamp = new Date(data.timestamp.setUTCMinutes(0, 0, 0));

    const measurementHour = await prisma.deviceMeasurementsHour.findFirst({
      where: {
        deviceId: data.deviceId,
        timestamp: data.timestamp,
      },
    });

    if (measurementHour) {
      // Update measurement Hour if have an equivalent record on database
      await prisma.deviceMeasurementsHour.update({
        where: {
          id: measurementHour.id,
        },
        data: {
          activeEnergy: measurementHour.activeEnergy + data.activeEnergy,
          activePower: measurementHour.activePower + data.activePower,
          aggregateCount: measurementHour.aggregateCount + 1,
          activeEnergyAvg:
            (measurementHour.activeEnergy + data.activeEnergy) /
            (measurementHour.aggregateCount + 1),
          activePowerAvg:
            (measurementHour.activePower + data.activePower) /
            (measurementHour.aggregateCount + 1),
        },
      });

      console.log(
        'Update Measurements Hour - ',
        data.deviceId,
        ' - ',
        data.timestamp,
      );
    } else {
      // Create measurement Hour if dont have an equivalent record on database
      await prisma.deviceMeasurementsHour.create({
        data,
      });

      console.log(
        'Create Measurements Hour - ',
        data.deviceId,
        ' - ',
        data.timestamp,
      );
    }

    // Create or Update measurement Day
    data.timestamp = new Date(data.timestamp.setUTCHours(0, 0, 0));

    const measurementDay = await prisma.deviceMeasurementsDay.findFirst({
      where: {
        deviceId: data.deviceId,
        timestamp: data.timestamp,
      },
    });

    if (measurementDay) {
      // Update measurement Day if have an equivalent record on database
      await prisma.deviceMeasurementsDay.update({
        where: {
          id: measurementDay.id,
        },
        data: {
          activeEnergy: measurementDay.activeEnergy + data.activeEnergy,
          activePower: measurementDay.activePower + data.activePower,
          aggregateCount: measurementDay.aggregateCount + 1,
          activeEnergyAvg:
            (measurementDay.activeEnergy + data.activeEnergy) /
            (measurementDay.aggregateCount + 1),
          activePowerAvg:
            (measurementDay.activePower + data.activePower) /
            (measurementDay.aggregateCount + 1),
        },
      });

      console.log(
        'Update Measurements Day - ',
        data.deviceId,
        ' - ',
        data.timestamp,
      );
    } else {
      // Create measurement Day if dont have an equivalent record on database
      await prisma.deviceMeasurementsDay.create({
        data,
      });

      console.log(
        'Create Measurements Day - ',
        data.deviceId,
        ' - ',
        data.timestamp,
      );
    }

    console.log('ok');
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
