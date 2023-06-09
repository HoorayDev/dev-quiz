import { BadRequestException, Injectable } from '@nestjs/common';
import { QuizRepository } from '@api/quiz/quiz.repository';
import { QuizMapper } from '@api/quiz/quiz.mapper';
import { ReadAllResponse } from '@app/share-library/type/class.interface';
import { QuizEntity } from '@app/share-library/entities/question/quiz.entity';
import { ReadOneQuizDto } from '@api/quiz/dto/quiz.response.dto';

@Injectable()
export class QuizService {
  constructor(
    private readonly quizRepository: QuizRepository,
    private readonly quizMapper: QuizMapper,
  ) {}
  async findOne(id: number) {
    const data = await this.quizRepository.findOneWithKey(id);
    if (!data) throw new BadRequestException('Quiz not found');

    // Error Convention 추후 정리
    const convertQuiz = this.quizMapper.toViewQuizDto(data);
    if (!convertQuiz) throw new BadRequestException('Quiz not found');
    return convertQuiz;
  }
  async findAll({
    currentUser,
    quizSetId,
  }): Promise<ReadAllResponse<ReadOneQuizDto>> {
    return await this.quizRepository.findAllWithResponse({
      quiz_set: quizSetId,
      currentUser,
    });
  }
}
