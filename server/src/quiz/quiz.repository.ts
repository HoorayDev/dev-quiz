import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizEntity } from '@app/share-library/entities/question/quiz.entity';
import { JoinColumn, ManyToOne, Repository } from 'typeorm';
import {
  ReadAllResponse,
  RepositoryInterface,
} from '@app/share-library/type/class.interface';
import { QuizPartial } from '@api/quiz/type/quiz.logic';
import { QuizSetEntity } from '@app/share-library/entities/question/quiz-set.entity';

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

  async findAll(filter: QuizPartial): Promise<ReadAllResponse<QuizEntity>> {
    // TODO: 추후 다른 function 으로 분리 ( pagination x, isCorrect prop 필요 )

    const [data, count] = await this.quizRepository
      .createQueryBuilder('quiz')
      .where('quiz.quiz_set_id = :quiz_set', { quiz_set: filter.quiz_set })
      .leftJoin('quiz.quiz_set', 'quiz_set')
      .select(['quiz', 'quiz_set.id'])
      .getManyAndCount();
    return {
      count: count,
      currentPage: 1,
      list: data,
      totalPage: 1,
    };
  }

  findOneWithFilter(key: QuizKey, filter: QuizPartial): Promise<QuizEntity> {
    return Promise.resolve(undefined);
  }

  async findOneWithKey(key: QuizKey): Promise<QuizEntity> {
    const data = await this.quizRepository
      .createQueryBuilder('quiz')
      .leftJoin('quiz.quiz_set', 'quiz_set')
      .select(['quiz', 'quiz_set.id'])
      .where({
        id: key,
      })
      .getOne();
    return data;
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
