import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QuizOptionService } from './quiz-option.service';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QuizParamInputDto } from '@api/quiz/dto/quiz.input.dto';
import { ReadAllQuizOptionResponseDto } from '@api/quiz-option/dto/quiz-option.response.dto';
import { JwtGuard } from '@app/share-library/guard/jwt.guard';

@ApiTags('quiz-option')
@ApiCookieAuth('id')
@UseGuards(JwtGuard)
@Controller('/quiz-set/:quizSetId/quiz/:quizId/quiz-option')
export class QuizOptionController {
  constructor(private readonly quizOptionService: QuizOptionService) {}

  @ApiOperation({ summary: 'quiz-option 전체 조회' })
  @ApiParam({
    name: 'quizSetId',
    type: Number,
  })
  @ApiParam({
    name: 'quizId',
    type: Number,
    description: '퀴즈 ID',
  })
  @ApiResponse({
    status: 200,
    type: ReadAllQuizOptionResponseDto,
  })
  @Get()
  findAll(@Param() { quizSetId, quizId }: QuizParamInputDto) {
    console.log(quizSetId, quizId);
    return this.quizOptionService.findAll(quizId);
  }
}
