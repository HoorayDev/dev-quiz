import { ApiProperty, PickType } from '@nestjs/swagger';
import { QuizSetEntity } from '@app/share-library/entities/question/quiz-set.entity';
import { QuizSetCategory } from '@app/share-library/enum/quiz-set.enum';

class BaseQuizSetEntity implements Partial<QuizSetEntity> {
  @ApiProperty({
    description: '퀴즈 Set ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '퀴즈 Set 제목',
    example: '퀴즈 Set 제목',
  })
  title: string;

  @ApiProperty({
    description: '퀴즈 Set 카테고리',
    example: QuizSetCategory.JAVASCRIPT,
  })
  category: QuizSetCategory;

  @ApiProperty({
    description: '퀴즈 Level',
    example: 1,
  })
  level: number;

  @ApiProperty({
    description: '퀴즈 Set 설명',
    example: '퀴즈 Set 설명',
  })
  description: string;

  @ApiProperty({
    description: '퀴즈 Set 생성일',
    example: '2021-01-01',
  })
  created_at: Date;

  @ApiProperty({
    description: '퀴즈 Set 수정일',
    example: '2021-01-01',
  })
  updated_at: Date;
}

export class ReadOneQuizSetResponseDto extends PickType(BaseQuizSetEntity, [
  'id',
  'title',
  'category',
  'level',
  'description',
  'created_at',
]) {}

export class ReadAllQuizSetResponseDto {
  @ApiProperty({
    description: '퀴즈 Set List',
    type: () => [ReadOneQuizSetResponseDto],
  })
  list: ReadOneQuizSetResponseDto[];

  @ApiProperty({
    description: '퀴즈 Set 전체 개수',
    example: 1,
  })
  total: number;

  @ApiProperty({
    description: '퀴즈 Set 전체 페이지 수',
    example: 1,
  })
  totalPage: number;

  @ApiProperty({
    description: '퀴즈 Set 현재 페이지',
    example: 1,
  })
  currentPage: number;
}
