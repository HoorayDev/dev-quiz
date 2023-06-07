import { Controller, Get, Param } from '@nestjs/common';
import { QuizOptionService } from './quiz-option.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { QuizParamInputDto } from '@api/quiz/dto/quiz.input.dto';

@ApiTags('quiz-option')
@Controller('/quiz-set/:quizSetId/quiz/:quizId/quiz-option')
export class QuizOptionController {
  constructor(private readonly quizOptionService: QuizOptionService) {}

  @ApiParam({
    name: 'quizSetId',
    type: Number,
  })
  @ApiParam({
    name: 'quizId',
    type: Number,
    description: '퀴즈 ID',
  })
  @Get()
  findAll(@Param() { quizSetId, quizId }: QuizParamInputDto) {
    return this.quizOptionService.findAll();
  }
}
