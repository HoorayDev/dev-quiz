import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class QuizVoteDto {
  @ApiProperty({
    description: '퀴즈 id',
    type: Number,
    example: 1,
  })
  quizId: number;

  @ApiProperty({
    description: '유저 선택 옵션의 ID',
    type: Number,
    example: 1,
  })
  @IsNumber()
  selectedOptionId: number;
}
export class QuizVoteInputDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    description: '유저 제출 답안',
    type: () => [QuizVoteDto],
  })
  userVoteList: QuizVoteDto[];
}
