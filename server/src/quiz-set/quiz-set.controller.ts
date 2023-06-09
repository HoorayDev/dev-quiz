import { Controller, Get, Param, Query } from '@nestjs/common';
import { QuizSetService } from './quiz-set.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Pagination } from '@app/share-library/dto/request.dto';
import {
  ReadAllQuizSetResponseDto,
  ReadOneQuizSetResponseDto,
  ReadOneQuizSetResponseWithQuizListDto,
} from '@api/quiz-set/dto/quiz-set.response.dto';
@ApiTags('quiz-set')
@Controller('quiz-set')
export class QuizSetController {
  constructor(private readonly quizSetService: QuizSetService) {}

  // TODO: 기본적인 정보만 뿌려주는 API 화
  @ApiOperation({ summary: '퀴즈 Set 리스트   조회' })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: '페이지 번호',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: '페이지당 데이터 수',
  })
  @ApiResponse({
    status: 200,
    description: '퀴즈 Set 조회 성공',
    type: ReadAllQuizSetResponseDto,
  })
  @Get()
  findAll(@Query() pagination: Pagination) {
    return this.quizSetService.findAll();
  }

  // TODO: 퀴즈 Set 조회
  // TODO: 닉네임 생성 여부 체크
  // TODO: 확인 이후, 퀴즈 Set 조회 ( Detail, Quiz, Option )

  @ApiOperation({ summary: '퀴즈 Set 단일 조회' })
  @ApiResponse({
    status: 200,
    description: '퀴즈 Set 조회 성공',
    type: ReadOneQuizSetResponseWithQuizListDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizSetService.findOne(+id);
  }
}
