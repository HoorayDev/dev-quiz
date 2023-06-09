import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { QuizOptionEntity } from '@app/share-library/entities/question/quiz-option.entity';

class BaseQuizOptionEntity implements Partial<QuizOptionEntity> {
  @ApiProperty({
    description: '퀴즈 Option ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '퀴즈 Option 내용',
    example: '퀴즈 Option 내용',
  })
  content: string;

  @ApiProperty({
    description: '퀴즈 ID',
    example: 1,
  })
  quiz_id: number;

  @ApiProperty({
    description: '퀴즈 Option 값',
    example: 1,
  })
  value: number;

  @ApiProperty({
    description: '퀴즈 Option 생성일',
    example: '2021-01-01',
  })
  created_at: Date;

  @ApiProperty({
    description: '퀴즈 Option 수정일',
    example: '2021-01-01',
  })
  updated_at: Date;
}
export class ReadOneQuizOptionResponseDto extends PickType(
  BaseQuizOptionEntity,
  ['id', 'content', 'value', 'created_at', 'updated_at'],
) {}

export class ReadAllQuizOptionResponseDto {
  @ApiProperty({
    description: '퀴즈 option 리스트',
    type: () => [ReadOneQuizOptionResponseDto],
  })
  quizOptionList: ReadOneQuizOptionResponseDto[];
}
