import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller('api/health-check')
export class HealthCheckController {
  @Get()
  healthCheck() {
    return {
      statusCode: HttpStatus.OK,
      message: 'The server is running',
    };
  }
}
