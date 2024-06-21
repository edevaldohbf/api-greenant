import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DeviceMeasurementsHour, Prisma } from '@prisma/client';

@Injectable()
export class DeviceMeasurementsHourService {
  constructor(private prisma: DatabaseService) {}

  async create(
    data: Prisma.DeviceMeasurementsRawCreateInput,
  ): Promise<DeviceMeasurementsHour> {
    return this.prisma.deviceMeasurementsHour.create({
      data,
    });
  }

  async findAll(): Promise<DeviceMeasurementsHour[]> {
    return this.prisma.deviceMeasurementsHour.findMany({});
  }
}
