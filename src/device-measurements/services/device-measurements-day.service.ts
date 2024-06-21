import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DeviceMeasurementsDay, Prisma } from '@prisma/client';

@Injectable()
export class DeviceMeasurementsDayService {
  constructor(private prisma: DatabaseService) {}

  async create(
    data: Prisma.DeviceMeasurementsRawCreateInput,
  ): Promise<DeviceMeasurementsDay> {
    return this.prisma.deviceMeasurementsDay.create({
      data,
    });
  }

  async findAll(): Promise<DeviceMeasurementsDay[]> {
    return this.prisma.deviceMeasurementsDay.findMany({});
  }
}
