import { Module } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { DeviceMeasurementsModule } from './device-measurements/device-measurements.module';

@Module({
  imports: [DeviceMeasurementsModule],
  providers: [DatabaseService],
})
export class AppModule {}
