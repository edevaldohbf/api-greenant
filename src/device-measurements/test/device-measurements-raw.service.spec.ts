import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from 'src/database/database.service';
import { DeviceMeasurementsRawService } from 'src/device-measurements/services/device-measurements-raw.service';
import { DeviceMeasurementsRaw } from '@prisma/client';

describe('DeviceMeasurementsRawService', () => {
  let service: DeviceMeasurementsRawService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeviceMeasurementsRawService,
        {
          provide: DatabaseService,
          useValue: {
            deviceMeasurementsRaw: {
              create: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<DeviceMeasurementsRawService>(
      DeviceMeasurementsRawService,
    );
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new measurement', async () => {
      const newMeasurement: DeviceMeasurementsRaw = {
        id: 1,
        deviceId: 'device-123',
        timestamp: new Date(),
        activeEnergy: 100,
        activePower: 200,
      };

      (
        databaseService.deviceMeasurementsRaw.create as jest.Mock
      ).mockResolvedValue(newMeasurement);

      const result = await service.create(
        newMeasurement.deviceId,
        newMeasurement.timestamp,
        newMeasurement.activeEnergy,
        newMeasurement.activePower,
      );

      expect(result).toEqual(newMeasurement);
      expect(databaseService.deviceMeasurementsRaw.create).toHaveBeenCalledWith(
        {
          data: {
            deviceId: newMeasurement.deviceId,
            timestamp: newMeasurement.timestamp,
            activeEnergy: newMeasurement.activeEnergy,
            activePower: newMeasurement.activePower,
          },
        },
      );
    });
  });

  describe('findAll', () => {
    it('should return raw measurements if resolution is raw', async () => {
      const measurements = [
        {
          deviceId: 'device-123',
          timestamp: new Date(),
          activeEnergy: 100,
          activePower: 200,
        },
      ];

      (
        databaseService.deviceMeasurementsRaw.findMany as jest.Mock
      ).mockResolvedValue(measurements);

      const result = await service.findAll(
        ['device-123'],
        new Date('2023-01-01'),
        new Date('2023-12-31'),
        'raw',
      );

      expect(result).toEqual(
        measurements.map(({ deviceId, timestamp: date, activeEnergy }) => ({
          deviceId,
          date,
          activeEnergy,
        })),
      );
    });

    it('should return aggregated measurements if resolution is hour or day', async () => {
      const measurements = [
        {
          deviceId: 'device-123',
          timestamp: new Date('2023-06-15 10:15:00+00'),
          activeEnergy: 100,
          activePower: 200,
        },
        {
          deviceId: 'device-123',
          timestamp: new Date('2023-06-15 10:30:00+00'),
          activeEnergy: 150,
          activePower: 250,
        },
        {
          deviceId: 'device-123',
          timestamp: new Date('2023-06-15 11:15:00+00'),
          activeEnergy: 200,
          activePower: 300,
        },
        {
          deviceId: 'device-123',
          timestamp: new Date('2023-06-15 11:30:00+00'),
          activeEnergy: 250,
          activePower: 350,
        },
      ];

      (
        databaseService.deviceMeasurementsRaw.findMany as jest.Mock
      ).mockResolvedValue(measurements);

      const result = await service.findAll(
        ['device-123'],
        new Date('2023-06-15 10:00:00+00'),
        new Date('2023-06-15 12:00:00+00'),
        'hour',
      );

      expect(result).toEqual([
        {
          deviceId: 'device-123',
          date: new Date('2023-06-15T10:00:00Z').toISOString(),
          accumulatedEnergy: 250,
        },
        {
          deviceId: 'device-123',
          date: new Date('2023-06-15T11:00:00Z').toISOString(),
          accumulatedEnergy: 450,
        },
      ]);
    });
  });

  describe('findAllCompleteData', () => {
    it('should return all complete measurements', async () => {
      const measurements = [
        {
          deviceId: 'device-123',
          timestamp: new Date(),
          activeEnergy: 100,
          activePower: 200,
        },
      ];

      (
        databaseService.deviceMeasurementsRaw.findMany as jest.Mock
      ).mockResolvedValue(measurements);

      const result = await service.findAllCompleteData(
        ['device-123'],
        new Date('2023-01-01'),
        new Date('2023-12-31'),
      );

      expect(result).toEqual(measurements);
    });
  });
});
