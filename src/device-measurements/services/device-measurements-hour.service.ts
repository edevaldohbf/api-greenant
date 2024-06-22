import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DeviceMeasurementsHour } from '@prisma/client';

@Injectable()
export class DeviceMeasurementsHourService {
  constructor(private prisma: DatabaseService) {}

  async create(
    deviceId: string,
    reqtimestamp: Date,
    activeEnergy: number,
    activePower: number,
  ): Promise<DeviceMeasurementsHour> {
    const timestamp = new Date(
      reqtimestamp.setUTCMinutes(0, 0, 0),
    ).toISOString();

    const measurement = await this.prisma.deviceMeasurementsHour.findFirst({
      where: {
        deviceId: deviceId,
        timestamp: timestamp,
      },
    });

    if (measurement) {
      return this.prisma.deviceMeasurementsHour.update({
        where: {
          id: measurement.id,
        },
        data: {
          activeEnergy: measurement.activeEnergy + activeEnergy,
          activePower: measurement.activePower + activePower,
          aggregateCount: measurement.aggregateCount + 1,
          activeEnergyAvg:
            (measurement.activeEnergy + activeEnergy) /
            (measurement.aggregateCount + 1),
          activePowerAvg:
            (measurement.activePower + activePower) /
            (measurement.aggregateCount + 1),
        },
      });
    } else {
      return this.prisma.deviceMeasurementsHour.create({
        data: {
          deviceId,
          timestamp,
          activeEnergy,
          activePower,
        },
      });
    }
  }

  async findAll(
    listDeviceId: string[],
    startDate: Date,
    endDate: Date,
  ): Promise<DeviceMeasurementsHour[]> {
    return this.prisma.deviceMeasurementsHour.findMany({
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
