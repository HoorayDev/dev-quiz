import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  HealthCheckDto,
  HealthCheckResponse,
} from '@app/share-library/dto/health.dto';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Endpoint: Health Check
  @ApiResponse({
    status: 200,
    description: 'Health Check',
    type: HealthCheckResponse,
  })
  @Get('/health')
  healthCheck(): HealthCheckDto {
    return {
      result: true,
    };
  }
}
