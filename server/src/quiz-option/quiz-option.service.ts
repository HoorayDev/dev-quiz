import { Injectable } from '@nestjs/common';
import { QuizOptionRepository } from '@api/quiz-option/quiz-option.repository';
import { QuizOptionMapper } from '@api/quiz-option/quiz-option.mapper';

@Injectable()
export class QuizOptionService {
  constructor(
    private readonly quizOptionRepository: QuizOptionRepository,
    private readonly quizOptionMapper: QuizOptionMapper,
  ) {}
  async findAll(quizId: number) {
    const data = await this.quizOptionRepository.findAllWithQuizId(quizId);
    return this.quizOptionMapper.entityToReadOneQuizOptionDtoList(data);
  }
}
