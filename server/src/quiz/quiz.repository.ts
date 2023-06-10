import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizEntity } from '@app/share-library/entities/question/quiz.entity';
import { Repository } from 'typeorm';
import {
  ReadAllResponse,
  RepositoryInterface,
} from '@app/share-library/type/class.interface';
import { QuizPartial } from '@api/quiz/type/quiz.logic';

type QuizKey = number;
@Injectable()
export class QuizRepository
  implements RepositoryInterface<QuizEntity, QuizKey, QuizPartial>
{
  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepository: Repository<QuizEntity>,
  ) {}

  create(createProp: QuizEntity): Promise<QuizEntity> {
    return Promise.resolve(undefined);
  }

  findAll(filter: QuizPartial): Promise<ReadAllResponse<QuizEntity>> {
    return Promise.resolve(undefined);
  }

  findOneWithFilter(key: QuizKey, filter: QuizPartial): Promise<QuizEntity> {
    return Promise.resolve(undefined);
  }

  findOneWithKey(key: QuizKey): Promise<QuizEntity> {
    return Promise.resolve(undefined);
  }

  remove(key: QuizKey): Promise<QuizKey> {
    return Promise.resolve(undefined);
  }

  update({
    key,
    prop,
  }: {
    key: QuizKey;
    prop: QuizEntity;
  }): Promise<QuizEntity> {
    return Promise.resolve(undefined);
  }
}
