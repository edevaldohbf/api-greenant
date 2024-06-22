import { Module } from '@nestjs/common';
import { DeviceMeasurementsRawService } from './services/device-measurements-raw.service';
import { DeviceMeasurementsHourService } from './services/device-measurements-hour.service';
import { DeviceMeasurementsDayService } from './services/device-measurements-day.service';
import { DeviceMeasurementsController } from './device-measurements.controller';
import { DatabaseService } from 'src/database/database.service';
import { DateUtils } from 'src/utils/date/date.utils';

@Module({
  controllers: [DeviceMeasurementsController],
  providers: [
    DeviceMeasurementsRawService,
    DeviceMeasurementsHourService,
    DeviceMeasurementsDayService,
    DatabaseService,
    DateUtils,
  ],
})
export class DeviceMeasurementsModule {}
