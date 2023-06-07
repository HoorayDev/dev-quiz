import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizResponseService {
  create(createQuizResponseDto) {
    return 'This action adds a new quizResponse';
  }
}
