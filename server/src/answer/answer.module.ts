import { Module } from '@nestjs/common';
import { AnswerService } from '@api/answer/answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizAnswerEntity } from '@app/share-library/entities/question/quiz-answer.entity';
import { AnswerRepository } from '@api/answer/answer.repository';
import { AnswerMapper } from '@api/answer/answer.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([QuizAnswerEntity])],
  providers: [AnswerService, AnswerRepository, AnswerMapper],
  exports: [AnswerService],
})
export class AnswerModule {}
