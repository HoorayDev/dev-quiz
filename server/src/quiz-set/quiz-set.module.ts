import { Module } from '@nestjs/common';
import { QuizSetService } from './quiz-set.service';
import { QuizSetController } from './quiz-set.controller';

@Module({
  controllers: [QuizSetController],
  providers: [QuizSetService]
})
export class QuizSetModule {}
