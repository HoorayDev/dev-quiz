import { QuizSetEntity } from '@app/share-library/entities/question/quiz-set.entity';
import { PartialType } from '@nestjs/mapped-types';
import { Pagination } from '@app/share-library/dto/request.dto';

export class QuizSetLogicInterface extends PartialType(QuizSetEntity) {}

export class QuizSetFilter {
  pagination: Pagination;
  filter?: QuizSetLogicInterface;
}
