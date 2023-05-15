import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '@app/share-library/dto/response.dto';

export class HealthCheckDto {
  @ApiProperty({ description: 'Health Check' })
  result: boolean;
}

export class HealthCheckResponse implements ResponseDto<HealthCheckDto> {
  @ApiProperty()
  statusCode: number;

  @ApiProperty({ type: () => HealthCheckDto })
  data: HealthCheckDto;
}
