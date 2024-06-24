import { Test, TestingModule } from '@nestjs/testing';
import { DeviceMeasurementsController } from '../device-measurements.controller';
import { DeviceMeasurementsRawService } from '../services/device-measurements-raw.service';
import { DeviceMeasurementsHourService } from '../services/device-measurements-hour.service';
import { DeviceMeasurementsDayService } from '../services/device-measurements-day.service';
import { DateUtils } from 'src/utils/date/date.utils';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateDeviceMeasurementDto } from '../dto/create-device-measurement.dto';
import { QueryParamsDeviceMeasurementDto } from '../dto/query-params-device-measurement.dto';

describe('DeviceMeasurementsController', () => {
  let controller: DeviceMeasurementsController;
  let deviceMeasurementsRawService: DeviceMeasurementsRawService;
  let deviceMeasurementsHourService: DeviceMeasurementsHourService;
  let deviceMeasurementsDayService: DeviceMeasurementsDayService;
  let dateUtils: DateUtils;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceMeasurementsController],
      providers: [
        {
          provide: DeviceMeasurementsRawService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findAllCompleteData: jest.fn(),
          },
        },
        {
          provide: DeviceMeasurementsHourService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
        {
          provide: DeviceMeasurementsDayService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
        {
          provide: DateUtils,
          useValue: {
            isValidDate: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DeviceMeasurementsController>(
      DeviceMeasurementsController,
    );
    deviceMeasurementsRawService = module.get<DeviceMeasurementsRawService>(
      DeviceMeasurementsRawService,
    );
    deviceMeasurementsHourService = module.get<DeviceMeasurementsHourService>(
      DeviceMeasurementsHourService,
    );
    deviceMeasurementsDayService = module.get<DeviceMeasurementsDayService>(
      DeviceMeasurementsDayService,
    );
    dateUtils = module.get<DateUtils>(DateUtils);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new measurement', async () => {
      const createDeviceMeasurementDto: CreateDeviceMeasurementDto = {
        timestamp: new Date().toISOString(),
        activeEnergy: 100,
        activePower: 200,
      };
      const deviceId = 'device-123';

      const resultRaw = { id: 'raw-id', ...createDeviceMeasurementDto };
      const resultHour = { id: 'hour-id', ...createDeviceMeasurementDto };
      const resultDay = { id: 'day-id', ...createDeviceMeasurementDto };

      (dateUtils.isValidDate as jest.Mock).mockResolvedValue(new Date());
      (deviceMeasurementsRawService.create as jest.Mock).mockResolvedValue(
        resultRaw,
      );
      (deviceMeasurementsHourService.create as jest.Mock).mockResolvedValue(
        resultHour,
      );
      (deviceMeasurementsDayService.create as jest.Mock).mockResolvedValue(
        resultDay,
      );

      const result = await controller.create(
        deviceId,
        createDeviceMeasurementDto,
      );

      expect(result).toEqual({
        deviceMeasurementsRaw: resultRaw,
        deviceMeasurementsHour: resultHour,
        deviceMeasurementsDay: resultDay,
      });
    });

    it('should throw an error if creation fails', async () => {
      const createDeviceMeasurementDto: CreateDeviceMeasurementDto = {
        timestamp: 'invalid-timestamp',
        activeEnergy: 100,
        activePower: 200,
      };
      const deviceId = 'device-123';

      (dateUtils.isValidDate as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid date');
      });

      await expect(
        controller.create(deviceId, createDeviceMeasurementDto),
      ).rejects.toThrow(
        new HttpException(
          'Error in path params or req body',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe('findAll', () => {
    it('should return all measurements', async () => {
      const queryParams: QueryParamsDeviceMeasurementDto = {
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        resolution: 'raw',
      };
      const deviceId = 'device-123,device-456';

      const resultMeasurements = [
        { id: 'measurement-id', deviceId: 'device-123' },
      ];

      (dateUtils.isValidDate as jest.Mock).mockResolvedValue(new Date());
      (deviceMeasurementsRawService.findAll as jest.Mock).mockResolvedValue(
        resultMeasurements,
      );

      const result = await controller.findAll(deviceId, queryParams);

      expect(result).toEqual({
        measurements: resultMeasurements,
      });
    });

    it('should throw an error if query params are invalid', async () => {
      const queryParams: QueryParamsDeviceMeasurementDto = {
        startDate: 'invalid-date',
        endDate: new Date().toISOString(),
        resolution: 'raw',
      };
      const deviceId = 'device-123';

      (dateUtils.isValidDate as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid date');
      });

      await expect(controller.findAll(deviceId, queryParams)).rejects.toThrow(
        new HttpException(
          'Error in path or query params',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe('findAllCompleteData', () => {
    it('should return complete data measurements', async () => {
      const queryParams: QueryParamsDeviceMeasurementDto = {
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        resolution: 'raw',
      };
      const deviceId = 'device-123,device-456';

      const resultMeasurements = [
        { id: 'measurement-id', deviceId: 'device-123' },
      ];

      (dateUtils.isValidDate as jest.Mock).mockResolvedValue(new Date());
      (
        deviceMeasurementsRawService.findAllCompleteData as jest.Mock
      ).mockResolvedValue(resultMeasurements);

      const result = await controller.findAllCompleteData(
        deviceId,
        queryParams,
      );

      expect(result).toEqual({
        measurements: resultMeasurements,
      });
    });

    it('should throw an error if query params are invalid', async () => {
      const queryParams: QueryParamsDeviceMeasurementDto = {
        startDate: 'invalid-date',
        endDate: new Date().toISOString(),
        resolution: 'raw',
      };
      const deviceId = 'device-123';

      (dateUtils.isValidDate as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid date');
      });

      await expect(
        controller.findAllCompleteData(deviceId, queryParams),
      ).rejects.toThrow(
        new HttpException(
          'Error in path or query params',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });
});
