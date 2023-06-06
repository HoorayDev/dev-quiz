import { Controller, Get, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz-set/:quizSetId/quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}
  @Get(':id')
  findOne(@Param() { quizSetId, id }: { quizSetId: string; id: string }) {
    // import { ApiCookieAuth } from '@nestjs/swagger';
    // @ApiCookieAuth('user-uuid')
    return this.quizService.findOne(+id);
  }
}
