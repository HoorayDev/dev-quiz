import { OmitType, PartialType } from '@nestjs/swagger';
import { QuizEntity } from '@app/share-library/entities/question/quiz.entity';

export class QuizPartial extends OmitType(PartialType(QuizEntity), [
  'quiz_set',
] as const) {
  quiz_set: number;
}
