import { Test, TestingModule } from '@nestjs/testing';
import { DeviceMeasurementsService } from './services/device-measurements-raw.service';

describe('DeviceMeasurementsService', () => {
  let service: DeviceMeasurementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceMeasurementsService],
    }).compile();

    service = module.get<DeviceMeasurementsService>(DeviceMeasurementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
