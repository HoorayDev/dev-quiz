import { Module } from '@nestjs/common';
import { QuizResponseService } from './quiz-response.service';
import { QuizResponseController } from './quiz-response.controller';
import { AnswerModule } from '@api/answer/answer.module';

@Module({
  imports: [AnswerModule],
  controllers: [QuizResponseController],
  providers: [QuizResponseService],
})
export class QuizResponseModule {}
