import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DeviceMeasurementsRawService } from './services/device-measurements-raw.service';
import { DeviceMeasurementsHourService } from './services/device-measurements-hour.service';
import { DeviceMeasurementsDayService } from './services/device-measurements-day.service';
import { CreateDeviceMeasurementDto } from './dto/create-device-measurement.dto';
import { QueryParamsDeviceMeasurementDto } from './dto/query-params-device-measurement.dto';
import { DateUtils } from 'src/utils/date/date.utils';

@Controller('api/device')
export class DeviceMeasurementsController {
  constructor(
    private readonly deviceMeasurementsRawService: DeviceMeasurementsRawService,
    private readonly deviceMeasurementsHourService: DeviceMeasurementsHourService,
    private readonly deviceMeasurementsDayService: DeviceMeasurementsDayService,
    private readonly dateUtils: DateUtils,
  ) {}

  @Post(':deviceId/measurements')
  async create(
    @Param('deviceId') deviceId: string,
    @Body() deviceMeasurement: CreateDeviceMeasurementDto,
  ) {
    try {
      const timestamp = await this.dateUtils.isValidDate(
        deviceMeasurement.timestamp,
      );

      const deviceMeasurementsRaw =
        await this.deviceMeasurementsRawService.create(
          deviceId,
          timestamp,
          deviceMeasurement.activeEnergy,
          deviceMeasurement.activePower,
        );

      const deviceMeasurementsHour =
        await this.deviceMeasurementsHourService.create(
          deviceId,
          timestamp,
          deviceMeasurement.activeEnergy,
          deviceMeasurement.activePower,
        );

      const deviceMeasurementsDay =
        await this.deviceMeasurementsDayService.create(
          deviceId,
          timestamp,
          deviceMeasurement.activeEnergy,
          deviceMeasurement.activePower,
        );

      return {
        deviceMeasurementsRaw,
        deviceMeasurementsHour,
        deviceMeasurementsDay,
      };
    } catch (error) {
      throw new HttpException(
        'Error in path params or req body',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':listDeviceId/measurements')
  async findAll(
    @Param('listDeviceId') deviceId: string,
    @Query() queryParams: QueryParamsDeviceMeasurementDto,
  ) {
    try {
      const listDeviceId = deviceId.split(',');

      const startDate = await this.dateUtils.isValidDate(queryParams.startDate);
      const endDate = await this.dateUtils.isValidDate(queryParams.endDate);

      const resolution = queryParams.resolution
        ? queryParams.resolution
        : 'day';

      const deviceMeasurements =
        await this.deviceMeasurementsRawService.findAll(
          listDeviceId,
          startDate,
          endDate,
          resolution,
        );

      return {
        measurements: deviceMeasurements,
      };
    } catch (error) {
      throw new HttpException(
        'Error in path or query params',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':listDeviceId/measurements/complete-data')
  async findAllCompleteData(
    @Param('listDeviceId') deviceId: string,
    @Query() queryParams: QueryParamsDeviceMeasurementDto,
  ) {
    try {
      const listDeviceId = deviceId.split(',');

      const startDate = await this.dateUtils.isValidDate(queryParams.startDate);
      const endDate = await this.dateUtils.isValidDate(queryParams.endDate);

      if (queryParams.resolution == 'raw') {
        const deviceMeasurements =
          await this.deviceMeasurementsRawService.findAllCompleteData(
            listDeviceId,
            startDate,
            endDate,
          );

        return {
          measurements: deviceMeasurements,
        };
      } else if (queryParams.resolution == 'hour') {
        const deviceMeasurements =
          await this.deviceMeasurementsHourService.findAll(
            listDeviceId,
            startDate,
            endDate,
          );

        return {
          measurements: deviceMeasurements,
        };
      } else {
        const deviceMeasurements =
          await this.deviceMeasurementsDayService.findAll(
            listDeviceId,
            startDate,
            endDate,
          );

        return {
          measurements: deviceMeasurements,
        };
      }
    } catch (error) {
      throw new HttpException(
        'Error in path or query params',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
