import { Injectable } from '@nestjs/common';
import { QuizRepository } from '@api/quiz/quiz.repository';

@Injectable()
export class QuizService {
  constructor(private readonly quizRepository: QuizRepository) {}
  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }
}
