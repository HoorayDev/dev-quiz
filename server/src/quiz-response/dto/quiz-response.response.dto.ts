import { ApiProperty } from '@nestjs/swagger';

export class QuizVoteResponseDto {
  @ApiProperty({
    description: '맞춘 개수',
    example: 5,
  })
  correctCount: number;

  @ApiProperty({
    description: '틀린 개수',
    example: 5,
  })
  inCorrectCount: number;

  @ApiProperty({
    description: '퀴즈 총 개수',
    example: 10,
  })
  totalCount: number;

  @ApiProperty({
    description: '퀴즈별 정답 여부',
    example: {
      1: true,
      2: false,
      3: true,
    },
  })
  correctMap: { [key: string]: boolean };

  @ApiProperty({
    description: '정답률',
  })
  correctPercentage: number;

  @ApiProperty({
    description: '오답률',
  })
  inCorrectPercentage: number;
}
