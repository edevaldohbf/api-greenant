import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DeviceMeasurementsRaw, Prisma } from '@prisma/client';

@Injectable()
export class DeviceMeasurementsRawService {
  constructor(private prisma: DatabaseService) {}

  async create(
    data: Prisma.DeviceMeasurementsRawCreateInput,
  ): Promise<DeviceMeasurementsRaw> {
    return this.prisma.deviceMeasurementsRaw.create({
      data,
    });
  }

  async findAll(): Promise<DeviceMeasurementsRaw[]> {
    return this.prisma.deviceMeasurementsRaw.findMany({});
  }
}
