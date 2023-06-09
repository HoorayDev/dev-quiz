import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common';

export const ApiResponseDto = <T extends Type<unknown>>(data: T) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              statusCode: {
                type: 'number',
                example: 201,
              },
              data: {
                type: 'object',
                $ref: getSchemaPath(data),
                // items: { $ref: getSchemaPath(data) },
              },
            },
          },
        ],
      },
    }),
  );
};

export class ResponseDto<T> {
  @ApiProperty({
    example: 200,
    description: '상태 코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '성공',
    description: '응답 메시지',
  })
  data: T;
}
export class ResultResponseDto {
  @ApiProperty({
    example: true,
    description: '성공 여부',
  })
  result: boolean;
}

export class CreateResponseDto implements ResponseDto<ResultResponseDto> {
  @ApiProperty({
    example: 201,
    description: '상태 코드',
  })
  statusCode: number;

  @ApiProperty({
    description: '응답 Data',
    type: () => ResultResponseDto,
  })
  data: ResultResponseDto;
}

class ErrorData {
  @ApiProperty({
    example: 400,
    description: '상태 코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '에러 메세지',
    description: '에러 메시지',
  })
  message: string;

  @ApiProperty({
    example: 'Bad Request',
    description: '에러 타입',
  })
  error: string;
}
export class ErrorResponseDto implements ResponseDto<ErrorData> {
  @ApiProperty({
    example: 400,
    description: '상태 코드',
  })
  statusCode: number;

  @ApiProperty({
    description: '응답 Data',
    type: () => ErrorData,
  })
  data: ErrorData;
}
