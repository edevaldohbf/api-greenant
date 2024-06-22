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
