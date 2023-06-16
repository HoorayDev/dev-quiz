import { BadRequestException, Injectable } from '@nestjs/common';
import { QuizSetRepository } from '@api/quiz-set/quiz-set.repository';
import { Pagination } from '@app/share-library/dto/request.dto';
import { QuizSetMapper } from '@api/quiz-set/quiz-set.mapper';

@Injectable()
export class QuizSetService {
  constructor(
    private readonly quizSetRepository: QuizSetRepository,
    private readonly quizSetMapper: QuizSetMapper,
  ) {}
  async findAll(pagination: Pagination) {
    const quizSetList = await this.quizSetRepository.findAll({ pagination });
    return this.quizSetMapper.entityListToQuizSetDtoList(quizSetList);
  }
  async findOne(quizSetId: number) {
    const quizSet = await this.quizSetRepository.findOneAddQuizListWithKey(
      quizSetId,
    );
    if (!quizSet) throw new BadRequestException('존재하지 않는 퀴즈셋입니다.');

    const result = this.quizSetMapper.toQuizSetDtoWithQuizList(quizSet);
    if (!result) throw new BadRequestException('존재하지 않는 퀴즈셋입니다.');
    return result;
  }
}
