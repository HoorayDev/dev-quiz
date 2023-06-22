import { ApiProperty, PickType } from '@nestjs/swagger';
import { QuizSetCategory } from '@app/share-library/enum/quiz-set.enum';
import { ResponseDto } from '@app/share-library/dto/response.dto';
import { QuizSetEntity } from '@app/share-library/entities/question/quiz-set.entity';

export class BaseQuizSetEntity implements Partial<QuizSetEntity> {
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
  createdAt: Date;

  @ApiProperty({
    description: '퀴즈 Set 수정일',
    example: '2021-01-01',
  })
  updatedAt: Date;
}

export class ReadOneQuizSetResponseDto extends PickType(BaseQuizSetEntity, [
  'id',
  'title',
  'category',
  'level',
  'description',
  'createdAt',
  'updatedAt',
]) {}

export class ReadOneQuizSetResponseWithQuizList extends BaseQuizSetEntity {
  @ApiProperty({
    description: '퀴즈 IDs',
    type: () => [Number],
  })
  quizIdList: number[];

  @ApiProperty({
    description: '퀴즈 개수',
    example: 1,
  })
  quizCount: number;
}

export class ReadOneQuizSetResponseWithQuizListDto
  implements ResponseDto<ReadOneQuizSetResponseWithQuizList>
{
  @ApiProperty({
    example: 200,
    description: '상태 코드',
  })
  statusCode: number;

  @ApiProperty({
    description: '응답 Data',
    type: () => ReadOneQuizSetResponseWithQuizList,
  })
  data: ReadOneQuizSetResponseWithQuizList;
}

export class ReadAllQuizSetResponse {
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

export class ReadAllQuizSetResponseDto
  implements ResponseDto<ReadAllQuizSetResponse>
{
  @ApiProperty({
    example: 200,
    description: '상태 코드',
  })
  statusCode: number;

  @ApiProperty({
    description: '응답 Data',
    type: () => ReadAllQuizSetResponse,
  })
  data: ReadAllQuizSetResponse;
}
