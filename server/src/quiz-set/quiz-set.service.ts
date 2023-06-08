import { BadRequestException, Injectable } from '@nestjs/common';
import { QuizSetRepository } from '@api/quiz-set/quiz-set.repository';

@Injectable()
export class QuizSetService {
  constructor(private readonly quizSetRepository: QuizSetRepository) {}
  findAll() {
    return 'a';
  }
  async findOne(quizSetId: number) {
    const quizSet = await this.quizSetRepository.findOneWithKey(quizSetId);
    if (!quizSet) throw new BadRequestException('존재하지 않는 퀴즈셋입니다.');
    return quizSet;
  }
}
