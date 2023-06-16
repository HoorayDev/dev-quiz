import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizAnswerEntity } from '@app/share-library/entities/question/quiz-answer.entity';
import { ReadAllQuizAnswer } from '@api/answer/type/answer.logic';

@Injectable()
export class AnswerRepository {
  constructor(
    @InjectRepository(QuizAnswerEntity)
    private readonly answerRepository: Repository<QuizAnswerEntity>,
  ) {}

  async getAnswer(quizSetId: number): Promise<ReadAllQuizAnswer[]> {
    return await this.answerRepository
      .createQueryBuilder('answer')
      .leftJoinAndSelect(
        'answer.quiz',
        'quiz',
        'quiz.quiz_set_id = :quizSetId',
        {
          quizSetId,
        },
      )
      .leftJoinAndSelect('answer.quiz_answer', 'quiz_answer')
      .select([
        'answer.id as id',
        'quiz.id as quiz_id',
        'quiz_answer.id as quiz_answer_id',
        'quiz_answer.value answer_value',
      ])
      .getRawMany<ReadAllQuizAnswer>();
  }
}
