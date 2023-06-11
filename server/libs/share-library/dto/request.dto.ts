import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class Pagination {
  @ApiProperty({
    description: '페이지 번호',
    example: 1,
  })
  @Type(() => Number)
  @IsNumber()
  page: number;

  @ApiProperty({
    description: '페이지당 데이터 수',
    example: 10,
  })
  @Type(() => Number)
  @IsNumber()
  limit: number;
}
