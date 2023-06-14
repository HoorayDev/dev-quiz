import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizAnswerEntity } from '@app/share-library/entities/question/quiz-answer.entity';

@Injectable()
export class AnswerRepository {
  constructor(
    @InjectRepository(QuizAnswerEntity)
    private readonly answerRepository: Repository<QuizAnswerEntity>,
  ) {}
}
