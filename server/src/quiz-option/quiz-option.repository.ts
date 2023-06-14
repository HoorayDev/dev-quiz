import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { QuizOptionEntity } from '@app/share-library/entities/question/quiz-option.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuizOptionRepository {
  constructor(
    @InjectRepository(QuizOptionEntity)
    private readonly quizOptionRepository: Repository<QuizOptionEntity>,
  ) {}

  async findAllWithQuizId(quizId: number) {
    //TODO: quizSetId Add Where
    return await this.quizOptionRepository.find({
      where: {
        quiz: {
          id: quizId,
        },
      },
    });
  }
}
