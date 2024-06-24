import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { DatabaseService } from './database/database.service';
import { DeviceMeasurementsModule } from './device-measurements/device-measurements.module';
import { HealthCheckController } from './health-check/health-check.controller';

describe('AppModule', () => {
  let appModule: TestingModule;

  beforeAll(async () => {
    appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should compile the module', async () => {
    expect(appModule).toBeDefined();
  });

  it('should provide DatabaseService', () => {
    const databaseService = appModule.get<DatabaseService>(DatabaseService);
    expect(databaseService).toBeInstanceOf(DatabaseService);
  });

  it('should import DeviceMeasurementsModule', () => {
    const deviceMeasurementsModule = appModule.get<DeviceMeasurementsModule>(
      DeviceMeasurementsModule,
    );
    expect(deviceMeasurementsModule).toBeDefined();
  });

  it('should have HealthCheckController', () => {
    const healthCheckController = appModule.get<HealthCheckController>(
      HealthCheckController,
    );
    expect(healthCheckController).toBeInstanceOf(HealthCheckController);
  });
});
