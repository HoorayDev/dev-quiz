import { ReadAllResponse } from '@app/share-library/type/class.interface';
import { QuizSetEntity } from '@app/share-library/entities/question/quiz-set.entity';
import { BaseQuizSetEntity } from '@api/quiz-set/dto/quiz-set.response.dto';

export interface QuizSerServiceInterface {
  // TODO: FindAll Item 추상화
  findAll(filter: any): void;

  findOne(key: number): void;
}


// For Mapper
export class ReadAllResponseQuizSet extends ReadAllResponse<QuizSetEntity> {}
export class ReadAllResponseQuizSetDto extends ReadAllResponse<BaseQuizSetEntity> {}