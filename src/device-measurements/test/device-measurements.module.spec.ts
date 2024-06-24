import { Test, TestingModule } from '@nestjs/testing';
import { DeviceMeasurementsModule } from 'src/device-measurements/device-measurements.module';
import { DeviceMeasurementsController } from 'src/device-measurements/device-measurements.controller';
import { DeviceMeasurementsRawService } from 'src/device-measurements/services/device-measurements-raw.service';
import { DeviceMeasurementsHourService } from 'src/device-measurements/services/device-measurements-hour.service';
import { DeviceMeasurementsDayService } from 'src/device-measurements/services/device-measurements-day.service';
import { DatabaseService } from 'src/database/database.service';
import { DateUtils } from 'src/utils/date/date.utils';

describe('DeviceMeasurementsModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [DeviceMeasurementsModule],
    }).compile();
  });

  it('should compile the module', () => {
    expect(module).toBeDefined();
  });

  it('should have DeviceMeasurementsController', () => {
    const controller = module.get<DeviceMeasurementsController>(
      DeviceMeasurementsController,
    );
    expect(controller).toBeInstanceOf(DeviceMeasurementsController);
  });

  it('should provide DeviceMeasurementsRawService', () => {
    const service = module.get<DeviceMeasurementsRawService>(
      DeviceMeasurementsRawService,
    );
    expect(service).toBeInstanceOf(DeviceMeasurementsRawService);
  });

  it('should provide DeviceMeasurementsHourService', () => {
    const service = module.get<DeviceMeasurementsHourService>(
      DeviceMeasurementsHourService,
    );
    expect(service).toBeInstanceOf(DeviceMeasurementsHourService);
  });

  it('should provide DeviceMeasurementsDayService', () => {
    const service = module.get<DeviceMeasurementsDayService>(
      DeviceMeasurementsDayService,
    );
    expect(service).toBeInstanceOf(DeviceMeasurementsDayService);
  });

  it('should provide DatabaseService', () => {
    const service = module.get<DatabaseService>(DatabaseService);
    expect(service).toBeInstanceOf(DatabaseService);
  });

  it('should provide DateUtils', () => {
    const service = module.get<DateUtils>(DateUtils);
    expect(service).toBeInstanceOf(DateUtils);
  });
});
