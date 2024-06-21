import {
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { DeviceMeasurementsRawService } from './services/device-measurements-raw.service';
// import { CreateDeviceMeasurementDto } from './dto/create-device-measurement.dto';
// import { UpdateDeviceMeasurementDto } from './dto/update-device-measurement.dto';

@Controller('device-measurements')
export class DeviceMeasurementsController {
  constructor(
    private readonly deviceMeasurementsService: DeviceMeasurementsRawService,
  ) {}

  // @Post()
  // create(@Body() createDeviceMeasurementDto: CreateDeviceMeasurementDto) {
  //   return this.deviceMeasurementsService.create(createDeviceMeasurementDto);
  // }

  @Get()
  findAll() {
    return this.deviceMeasurementsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.deviceMeasurementsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateDeviceMeasurementDto: UpdateDeviceMeasurementDto,
  // ) {
  //   return this.deviceMeasurementsService.update(
  //     +id,
  //     updateDeviceMeasurementDto,
  //   );
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.deviceMeasurementsService.remove(+id);
  // }
}
