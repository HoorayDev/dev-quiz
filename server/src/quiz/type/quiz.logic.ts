import { PartialType } from '@nestjs/swagger';
import { QuizEntity } from '@app/share-library/entities/question/quiz.entity';

export class QuizPartial extends PartialType(QuizEntity) {}
