import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DeviceMeasurementsDay } from '@prisma/client';

@Injectable()
export class DeviceMeasurementsDayService {
  constructor(private prisma: DatabaseService) {}

  async create(
    deviceId: string,
    reqtimestamp: Date,
    activeEnergy: number,
    activePower: number,
  ): Promise<DeviceMeasurementsDay> {
    const timestamp = new Date(reqtimestamp.setUTCHours(0, 0, 0)).toISOString();

    const measurement = await this.prisma.deviceMeasurementsDay.findFirst({
      where: {
        deviceId: deviceId,
        timestamp: timestamp,
      },
    });

    if (measurement) {
      return this.prisma.deviceMeasurementsDay.update({
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
      return this.prisma.deviceMeasurementsDay.create({
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
  ): Promise<DeviceMeasurementsDay[]> {
    return this.prisma.deviceMeasurementsDay.findMany({
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
