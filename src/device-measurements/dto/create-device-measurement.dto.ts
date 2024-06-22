export class CreateDeviceMeasurementDto {
  deviceId?: string;
  timestamp: string;
  activeEnergy: number;
  activePower: number;
}
