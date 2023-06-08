import { QuizSetEntity } from '@app/share-library/entities/question/quiz-set.entity';
import { PartialType } from '@nestjs/mapped-types';

export class QuizSetLogicInterface extends PartialType(QuizSetEntity) {}
