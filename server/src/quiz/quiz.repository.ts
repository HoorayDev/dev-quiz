import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizEntity } from '@app/share-library/entities/question/quiz.entity';
import { Repository } from 'typeorm';
import {
  ReadAllResponse,
  RepositoryInterface,
} from '@app/share-library/type/class.interface';
import { QuizPartial } from '@api/quiz/type/quiz.logic';
import { QuizResponseEntity } from '@app/share-library/entities/question/quiz-response.entity';
import { QuizAnswerEntity } from '@app/share-library/entities/question/quiz-answer.entity';
import { ReadOneQuizDto } from '@api/quiz/dto/quiz.response.dto';

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

  async findAllWithResponse(
    filter: QuizPartial,
  ): Promise<ReadAllResponse<ReadOneQuizDto>> {
    // TODO: 추후 다른 function 으로 분리 ( pagination x, isCorrect prop 필요 )
    const result = await this.quizRepository
      .createQueryBuilder('quiz')
      .leftJoin('quiz.quiz_set', 'quiz_set')
      .innerJoinAndSelect(
        (qb) => {
          return qb
            .from(QuizResponseEntity, 'tqr')
            .select('tqr.*')
            .innerJoinAndSelect(
              (qb2) => {
                return qb2
                  .select('MAX(groupTqr.created_at)', 'g_created_at')
                  .addSelect('MAX(groupTqr.id)', 'g_id')
                  .from(QuizResponseEntity, 'groupTqr')
                  .where('groupTqr.user_id = :user_id', {
                    user_id: filter.currentUser.id,
                  })
                  .groupBy('groupTqr.user_id, groupTqr.quiz_id');
              },
              'recentTqr',
              'recentTqr.g_id = tqr.id',
            );
        },
        'recentTqr',
        'recentTqr.quiz_id = quiz.id',
      )
      .leftJoinAndSelect(
        QuizAnswerEntity,
        'quiz_answer',
        'quiz_answer.quiz_id = quiz.id',
      )
      .where('quiz_set.id = :quiz_set', { quiz_set: filter.quiz_set })
      .select([
        'quiz.id as id',
        'quiz_set.id as quizSetId',
        'quiz.title as title',
        'quiz.content as content',
        'quiz.code as code',
        'quiz.description as description',
        'quiz.commentary as commentary',
        'quiz.created_at as createdAt',
        'quiz.updated_at as updatedAt',
        'recentTqr.user_is_correct as isCorrect',
        'quiz_answer.quiz_answer_option_id as answerOptionId',
        'recentTqr.quiz_option_id as userAnswerOptionId',
      ])
      .getRawMany<ReadOneQuizDto>();

    return {
      count: result.length,
      currentPage: 1,
      list: result,
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

  findAll(filter: QuizPartial): Promise<ReadAllResponse<QuizEntity>> {
    return Promise.resolve(undefined);
  }
}
