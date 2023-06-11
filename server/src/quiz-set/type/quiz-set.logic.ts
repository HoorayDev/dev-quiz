import { QuizSetEntity } from '@app/share-library/entities/question/quiz-set.entity';
import { PartialType } from '@nestjs/mapped-types';
import { Pagination } from '@app/share-library/dto/request.dto';

export class QuizSetLogicInterface extends PartialType(QuizSetEntity) {}

export class QuizSetFilter {
  pagination: Pagination;
  filter?: QuizSetLogicInterface;
}

export class QuizSetWithQuizListDto {
  id: number;
  title: string;
  category: string;
  tag: string;
  level: number;
  description: string;
  created_at: Date;
  updated_at: Date;
  quizIdList: string;
}
