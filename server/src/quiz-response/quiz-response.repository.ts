import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizResponseEntity } from '@app/share-library/entities/question/quiz-response.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizResponseRepository {
  constructor(
    @InjectRepository(QuizResponseEntity)
    private readonly quizResponseRepository: Repository<QuizResponseEntity>,
  ) {}

  async createMany(quizResponseEntity: QuizResponseEntity[]) {
    try {
      return await this.quizResponseRepository.save(quizResponseEntity);
    } catch (e) {
      // TODO: 에러 LOG
      return e;
    }
  }
}
