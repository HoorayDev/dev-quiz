import { Injectable } from '@nestjs/common';
import { RepositoryInterface } from '@app/share-library/type/class.interface';
import { QuizSetFilter } from '@api/quiz-set/type/quiz-set.logic';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizSetEntity } from '@app/share-library/entities/question/quiz-set.entity';
import { Repository } from 'typeorm';
import { plainToClass, plainToInstance } from 'class-transformer';
import { ReadAllResponseQuizSet } from '@api/quiz-set/type/quiz-set.class.interface';

type QuizSetKey = number;

@Injectable()
export class QuizSetRepository
  implements RepositoryInterface<QuizSetEntity, QuizSetKey, QuizSetFilter>
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

  async findAll({
    pagination,
  }: QuizSetFilter): Promise<ReadAllResponseQuizSet> {
    const { page, limit } = pagination;
    const offset = (page - 1) * limit;

    try {
      const [list, count] = await this.quizSetRepository
        .createQueryBuilder('quizSet')
        .offset(offset)
        .limit(limit)
        .getManyAndCount();

      const totalPage = Math.ceil(count / limit);

      const returnData = {
        list,
        count,
        totalPage,
        currentPage: page,
      };
      return plainToInstance(ReadAllResponseQuizSet, returnData);
    } catch (e) {}
    return Promise.resolve(undefined);
  }

  findOneWithFilter(
    key: QuizSetKey,
    filter: QuizSetFilter,
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
