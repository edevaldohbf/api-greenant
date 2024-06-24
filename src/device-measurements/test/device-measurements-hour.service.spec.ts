import { Test } from '@nestjs/testing';
import { DeviceMeasurementsHourService } from 'src/device-measurements/services/device-measurements-hour.service';
import { DatabaseService } from 'src/database/database.service';
import { DeviceMeasurementsHour } from '@prisma/client';

// Definindo uma interface para o mock do Prisma Client
interface PrismaClientMock {
  deviceMeasurementsHour: {
    findFirst: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    findMany: jest.Mock;
  };
}

// Criando um mock do PrismaClient para simular o comportamento do Prisma
const prismaMock: PrismaClientMock = {
  deviceMeasurementsHour: {
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
  },
};

describe('DeviceMeasurementsHourService', () => {
  let service: DeviceMeasurementsHourService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeviceMeasurementsHourService,
        {
          provide: DatabaseService,
          useValue: prismaMock as any, // Usando o mock criado acima
        },
      ],
    }).compile();

    service = moduleRef.get<DeviceMeasurementsHourService>(
      DeviceMeasurementsHourService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpa todos os mocks após cada teste
  });

  it('should create a new measurement when no existing measurement is found', async () => {
    const deviceId = 'device1';
    const reqtimestamp = new Date();
    const activeEnergy = 100;
    const activePower = 50;

    prismaMock.deviceMeasurementsHour.findFirst.mockResolvedValueOnce(null);
    prismaMock.deviceMeasurementsHour.create.mockResolvedValueOnce({
      id: 1,
      deviceId,
      timestamp: reqtimestamp, // Alteração aqui para usar o tipo Date diretamente
      activeEnergy,
      activePower,
      activeEnergyAvg: 100, // Valores de exemplo para propriedades adicionais
      activePowerAvg: 50,
      aggregateCount: 1,
    } as DeviceMeasurementsHour); // Ajuste aqui para corresponder ao tipo DeviceMeasurementsHour

    const result = await service.create(
      deviceId,
      reqtimestamp,
      activeEnergy,
      activePower,
    );

    expect(result).toBeDefined();
    expect(result.deviceId).toBe(deviceId);
    expect(result.activeEnergy).toBe(activeEnergy);
    expect(result.activePower).toBe(activePower);
    expect(prismaMock.deviceMeasurementsHour.findFirst).toHaveBeenCalledWith({
      where: {
        deviceId,
        timestamp: reqtimestamp.toISOString(), // Ajuste necessário para comparação com string
      },
    });
    expect(prismaMock.deviceMeasurementsHour.create).toHaveBeenCalledWith({
      data: {
        deviceId,
        timestamp: reqtimestamp.toISOString(),
        activeEnergy,
        activePower,
      },
    });
  });

  it('should update an existing measurement when found', async () => {
    const deviceId = 'device1';
    const reqtimestamp = new Date();
    const activeEnergy = 100;
    const activePower = 50;
    const existingMeasurement = {
      id: 1,
      deviceId,
      timestamp: reqtimestamp,
      activeEnergy: 200,
      activePower: 100,
      aggregateCount: 1,
      activeEnergyAvg: 200,
      activePowerAvg: 100,
    } as DeviceMeasurementsHour;

    prismaMock.deviceMeasurementsHour.findFirst.mockResolvedValueOnce(
      existingMeasurement,
    );
    prismaMock.deviceMeasurementsHour.update.mockResolvedValueOnce({
      ...existingMeasurement,
      activeEnergy: existingMeasurement.activeEnergy + activeEnergy,
      activePower: existingMeasurement.activePower + activePower,
      aggregateCount: existingMeasurement.aggregateCount + 1,
      activeEnergyAvg: (existingMeasurement.activeEnergy + activeEnergy) / 2,
      activePowerAvg: (existingMeasurement.activePower + activePower) / 2,
    } as DeviceMeasurementsHour);

    const result = await service.create(
      deviceId,
      reqtimestamp,
      activeEnergy,
      activePower,
    );

    expect(result).toBeDefined();
    expect(result.deviceId).toBe(deviceId);
    expect(result.activeEnergy).toBe(
      existingMeasurement.activeEnergy + activeEnergy,
    );
    expect(result.activePower).toBe(
      existingMeasurement.activePower + activePower,
    );
    expect(prismaMock.deviceMeasurementsHour.findFirst).toHaveBeenCalledWith({
      where: {
        deviceId,
        timestamp: reqtimestamp.toISOString(),
      },
    });
    expect(prismaMock.deviceMeasurementsHour.update).toHaveBeenCalledWith({
      where: {
        id: existingMeasurement.id,
      },
      data: {
        activeEnergy: existingMeasurement.activeEnergy + activeEnergy,
        activePower: existingMeasurement.activePower + activePower,
        aggregateCount: existingMeasurement.aggregateCount + 1,
        activeEnergyAvg: (existingMeasurement.activeEnergy + activeEnergy) / 2,
        activePowerAvg: (existingMeasurement.activePower + activePower) / 2,
      },
    });
  });

  it('should find all measurements between start and end dates for given device IDs', async () => {
    const listDeviceId = ['device1', 'device2'];
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-01-02');
    const mockMeasurements = [
      {
        id: 1,
        deviceId: 'device1',
        timestamp: startDate,
        activeEnergy: 100,
        activePower: 50,
      },
      {
        id: 2,
        deviceId: 'device2',
        timestamp: endDate,
        activeEnergy: 200,
        activePower: 100,
      },
    ] as DeviceMeasurementsHour[];

    prismaMock.deviceMeasurementsHour.findMany.mockResolvedValueOnce(
      mockMeasurements,
    );

    const result = await service.findAll(listDeviceId, startDate, endDate);

    expect(result).toBeDefined();
    expect(result.length).toBe(2);
    expect(result[0].deviceId).toBe('device1');
    expect(result[1].deviceId).toBe('device2');
    expect(prismaMock.deviceMeasurementsHour.findMany).toHaveBeenCalledWith({
      where: {
        deviceId: { in: listDeviceId },
        AND: [
          {
            timestamp: { gte: startDate }, // Ajuste para usar objeto Date diretamente
          },
          {
            timestamp: { lte: endDate }, // Ajuste para usar objeto Date diretamente
          },
        ],
      },
    });
  });
});
