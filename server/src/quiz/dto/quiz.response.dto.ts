import { QuizEntity } from '@app/share-library/entities/question/quiz.entity';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { ResponseDto } from '@app/share-library/dto/response.dto';
export class BaseQuizEntity implements Partial<QuizEntity> {
  @ApiProperty({
    description: '퀴즈 ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '퀴즈 Set ID',
    example: 1,
  })
  quiz_set_id: number;

  @ApiProperty({
    description: '퀴즈 제목',
    example: '퀴즈 제목',
  })
  title: string;

  @ApiProperty({
    description: '퀴즈 내용',
    example: '퀴즈 내용',
  })
  content: string;

  @ApiProperty({
    description: '퀴즈 코드',
    example: '퀴즈 코드',
  })
  code: string;

  @ApiProperty({
    description: '퀴즈 설명',
    example: '퀴즈 설명',
  })
  description: string;

  @ApiProperty({
    description: '퀴즈 해설',
    example: '퀴즈 해설',
  })
  commentary: string;

  @ApiProperty({
    description: '퀴즈 생성일',
    example: '2021-01-01',
  })
  created_at: Date;

  @ApiProperty({
    description: '퀴즈 수정일',
    example: '2021-01-01',
  })
  updated_at: Date;
}
export class ViewReadOneQuizDto extends OmitType(BaseQuizEntity, [
  'commentary',
] as const) {}

export class ViewReadOneQuizResponseDto
  implements ResponseDto<ViewReadOneQuizDto>
{
  @ApiProperty({
    description: '상태코드',
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    description: '응답 메시지',
    type: () => ViewReadOneQuizDto,
  })
  data: ViewReadOneQuizDto;
}
