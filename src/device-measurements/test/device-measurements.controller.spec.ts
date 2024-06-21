import { Test, TestingModule } from '@nestjs/testing';
import { DeviceMeasurementsController } from './device-measurements.controller';
import { DeviceMeasurementsService } from './services/device-measurements-raw.service';

describe('DeviceMeasurementsController', () => {
  let controller: DeviceMeasurementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceMeasurementsController],
      providers: [DeviceMeasurementsService],
    }).compile();

    controller = module.get<DeviceMeasurementsController>(
      DeviceMeasurementsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
