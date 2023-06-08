import { Injectable } from '@nestjs/common';
import { RepositoryInterface } from '@app/share-library/type/class.interface';
import { QuizSetLogicInterface } from '@api/quiz-set/type/quiz-set.logic';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizSetEntity } from '@app/share-library/entities/question/quiz-set.entity';
import { Repository } from 'typeorm';

type QuizSetKey = number;

@Injectable()
export class QuizSetRepository
  implements
    RepositoryInterface<QuizSetEntity, QuizSetKey, QuizSetLogicInterface>
{
  constructor(
    @InjectRepository(QuizSetEntity)
    private readonly quizSetRepository: Repository<QuizSetEntity>,
  ) {}

  async findOneWithKey(key: QuizSetKey): Promise<QuizSetEntity> {
    try {
      return await this.quizSetRepository
        .createQueryBuilder('quizSet')
        .where({ id: key })
        .getOne();
    } catch (e) {
      // TODO: ERROR LOG
    }
  }

  create(createProp: QuizSetEntity): Promise<QuizSetEntity> {
    return Promise.resolve(undefined);
  }

  findAll(filter: QuizSetLogicInterface): Promise<QuizSetEntity[]> {
    return Promise.resolve([]);
  }

  findOneWithFilter(
    key: QuizSetKey,
    filter: QuizSetLogicInterface,
  ): Promise<QuizSetEntity> {
    return Promise.resolve(undefined);
  }

  remove(key: QuizSetKey): Promise<QuizSetKey> {
    return Promise.resolve(undefined);
  }

  update({
    key,
    prop,
  }: {
    key: QuizSetKey;
    prop: QuizSetEntity;
  }): Promise<QuizSetEntity> {
    return Promise.resolve(undefined);
  }
}
