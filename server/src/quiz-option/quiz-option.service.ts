import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizOptionService {
  findAll() {
    return `This action returns all quizOption`;
  }
}
