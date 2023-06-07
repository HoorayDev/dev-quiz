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
}
