import { Module } from '@nestjs/common';
import { QuizResponseService } from './quiz-response.service';
import { QuizResponseController } from './quiz-response.controller';
import { AnswerModule } from '@api/answer/answer.module';
import { QuizResponseRepository } from '@api/quiz-response/quiz-response.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizResponseEntity } from '@app/share-library/entities/question/quiz-response.entity';

@Module({
  imports: [AnswerModule, TypeOrmModule.forFeature([QuizResponseEntity])],
  controllers: [QuizResponseController],
  providers: [QuizResponseService, QuizResponseRepository],
})
export class QuizResponseModule {}
