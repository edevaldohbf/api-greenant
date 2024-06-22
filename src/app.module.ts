import { Module } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { DeviceMeasurementsModule } from './device-measurements/device-measurements.module';
import { HealthCheckController } from './health-check/health-check.controller';

@Module({
  imports: [DeviceMeasurementsModule],
  providers: [DatabaseService],
  controllers: [HealthCheckController],
})
export class AppModule {}
