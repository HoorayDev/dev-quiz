import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizEntity } from '@app/share-library/entities/question/quiz.entity';
import { QuizRepository } from '@api/quiz/quiz.repository';
import { QuizMapper } from '@api/quiz/quiz.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([QuizEntity])],
  controllers: [QuizController],
  providers: [QuizService, QuizRepository, QuizMapper],
  exports: [QuizService],
})
export class QuizModule {}
