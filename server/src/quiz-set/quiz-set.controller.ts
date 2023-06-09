import { Controller, Get, Param, Query } from '@nestjs/common';
import { QuizSetService } from './quiz-set.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Pagination } from '@app/share-library/dto/request.dto';
import {
  ReadAllQuizSetResponseDto,
  ReadOneQuizSetResponseWithQuizListDto,
} from '@api/quiz-set/dto/quiz-set.response.dto';
@ApiTags('quiz-set')
@Controller('quiz-set')
export class QuizSetController {
  constructor(private readonly quizSetService: QuizSetService) {}

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
    return this.quizSetService.findAll(pagination);
  }

  @ApiOperation({ summary: '퀴즈 Set 단일 조회' })
  @ApiResponse({
    status: 200,
    description: '퀴즈 Set 조회 성공',
    type: ReadOneQuizSetResponseWithQuizListDto,
  })
  @Get(':quizSetId')
  findOne(@Param('quizSetId') id: string) {
    const quizSetId = Number(id);
    return this.quizSetService.findOne(quizSetId);
  }
}
