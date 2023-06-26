import { OmitType, PartialType } from '@nestjs/swagger';
import { QuizEntity } from '@app/share-library/entities/question/quiz.entity';
import { CurrentUserDto } from '@api/user/dto/user.input.dto';

export class QuizPartial extends OmitType(PartialType(QuizEntity), [
  'quiz_set',
] as const) {
  quiz_set: number;
  currentUser: CurrentUserDto;
}
