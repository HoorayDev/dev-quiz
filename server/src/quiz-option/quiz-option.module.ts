import { Module } from '@nestjs/common';
import { QuizOptionService } from './quiz-option.service';
import { QuizOptionController } from './quiz-option.controller';
import { QuizOptionRepository } from '@api/quiz-option/quiz-option.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizOptionEntity } from '@app/share-library/entities/question/quiz-option.entity';
import { QuizOptionMapper } from '@api/quiz-option/quiz-option.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([QuizOptionEntity])],
  controllers: [QuizOptionController],
  providers: [QuizOptionService, QuizOptionRepository, QuizOptionMapper],
})
export class QuizOptionModule {}
