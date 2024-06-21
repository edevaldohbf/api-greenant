import { Module } from '@nestjs/common';
import { DeviceMeasurementsRawService } from './services/device-measurements-raw.service';
import { DeviceMeasurementsHourService } from './services/device-measurements-hour.service';
import { DeviceMeasurementsDayService } from './services/device-measurements-day.service';
import { DeviceMeasurementsController } from './device-measurements.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [DeviceMeasurementsController],
  providers: [
    DeviceMeasurementsRawService,
    DeviceMeasurementsHourService,
    DeviceMeasurementsDayService,
    DatabaseService,
  ],
})
export class DeviceMeasurementsModule {}
