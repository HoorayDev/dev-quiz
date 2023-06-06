import { ApiProperty, ApiQuery } from '@nestjs/swagger';

export class Pagination {
  @ApiProperty({
    description: '페이지 번호',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: '페이지당 데이터 수',
    example: 10,
  })
  limit: number;
}
