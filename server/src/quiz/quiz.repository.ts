import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizEntity } from '@app/share-library/entities/question/quiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizRepository {
  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepository: Repository<QuizEntity>,
  ) {}
}
