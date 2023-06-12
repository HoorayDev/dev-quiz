import { Module } from '@nestjs/common';
import { QuizSetService } from './quiz-set.service';
import { QuizSetController } from './quiz-set.controller';
import { QuizSetRepository } from '@api/quiz-set/quiz-set.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizSetEntity } from '@app/share-library/entities/question/quiz-set.entity';
import { QuizSetMapper } from '@api/quiz-set/quiz-set.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([QuizSetEntity])],
  controllers: [QuizSetController],
  providers: [QuizSetService, QuizSetRepository, QuizSetMapper],
})
export class QuizSetModule {}
