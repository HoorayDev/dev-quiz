import {
  ResponseDto,
  ResultResponseDto,
} from '@app/share-library/dto/response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateResponseDto implements ResponseDto<ResultResponseDto> {
  @ApiProperty({
    example: 200,
    description: '상태 코드',
  })
  statusCode: number;

  @ApiProperty({
    description: '응답 Data',
    type: () => ResultResponseDto,
  })
  data: ResultResponseDto;
}
