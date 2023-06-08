import { Module } from '@nestjs/common';
import { QuizSetService } from './quiz-set.service';
import { QuizSetController } from './quiz-set.controller';
import { QuizSetRepository } from '@api/quiz-set/quiz-set.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizSetEntity } from '@app/share-library/entities/question/quiz-set.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizSetEntity])],
  controllers: [QuizSetController],
  providers: [QuizSetService, QuizSetRepository],
})
export class QuizSetModule {}
