import { Module } from '@nestjs/common';
import { QuizResponseService } from './quiz-response.service';
import { QuizResponseController } from './quiz-response.controller';

@Module({
  controllers: [QuizResponseController],
  providers: [QuizResponseService]
})
export class QuizResponseModule {}
