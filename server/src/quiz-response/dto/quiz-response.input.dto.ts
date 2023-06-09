import { ApiProperty } from '@nestjs/swagger';

export class QuizVoteDto {
  @ApiProperty({
    description: '퀴즈 id',
    type: Number,
    example: 1,
  })
  quizId: number;

  @ApiProperty({
    description: '유저 선택 옵션',
    type: Number,
    example: 1,
  })
  selectedOption: number;
}
export class QuizVoteInputDto {
  @ApiProperty({
    description: '유저 제출 답안',
    type: () => [QuizVoteDto],
  })
  userVoteList: QuizVoteDto[];
}
