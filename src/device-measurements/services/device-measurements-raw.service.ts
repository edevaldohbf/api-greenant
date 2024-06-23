import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DeviceMeasurementsRaw } from '@prisma/client';

@Injectable()
export class DeviceMeasurementsRawService {
  constructor(private prisma: DatabaseService) {}

  async create(
    deviceId: string,
    timestamp: Date,
    activeEnergy: number,
    activePower: number,
  ): Promise<DeviceMeasurementsRaw> {
    return this.prisma.deviceMeasurementsRaw.create({
      data: {
        deviceId,
        timestamp,
        activeEnergy,
        activePower,
      },
    });
  }

  async findAll(
    listDeviceId: string[],
    startDate: Date,
    endDate: Date,
    resolution: string,
  ) {
    const listMeasurements = await this.prisma.deviceMeasurementsRaw.findMany({
      where: {
        deviceId: { in: listDeviceId },
        AND: [
          {
            timestamp: { gte: startDate },
          },
          {
            timestamp: { lte: endDate },
          },
        ],
      },
    });

    if (resolution == 'raw') {
      return listMeasurements.map(
        ({
          deviceId: deviceId,
          timestamp: date,
          activeEnergy: activeEnergy,
        }) => ({
          deviceId,
          date,
          activeEnergy,
        }),
      );
    } else {
      const aggregatedMeasurement = listMeasurements.reduce(
        (accumulateMeasurements, measurement) => {
          let startHour: string;

          if (resolution == 'hour') {
            startHour = new Date(
              measurement.timestamp.setUTCMinutes(0, 0, 0),
            ).toISOString();
          } else {
            startHour = new Date(
              measurement.timestamp.setUTCHours(0, 0, 0),
            ).toISOString();
          }

          const key = `${measurement.deviceId}_${startHour}`;

          if (!accumulateMeasurements[key]) {
            accumulateMeasurements[key] = {
              deviceId: measurement.deviceId,
              date: startHour,
              accumulatedEnergy: measurement.activeEnergy,
            };
          }

          accumulateMeasurements[key].accumulatedEnergy +=
            measurement.activeEnergy;

          return accumulateMeasurements;
        },
        {},
      );

      return Object.values(aggregatedMeasurement);
    }
  }

  async findAllCompleteData(
    listDeviceId: string[],
    startDate: Date,
    endDate: Date,
  ): Promise<DeviceMeasurementsRaw[]> {
    return this.prisma.deviceMeasurementsRaw.findMany({
      where: {
        deviceId: { in: listDeviceId },
        AND: [
          {
            timestamp: { gte: startDate },
          },
          {
            timestamp: { lte: endDate },
          },
        ],
      },
    });
  }
}
