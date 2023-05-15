import { Injectable } from '@nestjs/common';
import {
  CreateQuizSetDto,
  UpdateQuizSetDto,
} from '@api/quiz-set/dto/quiz-set.input.dto';

@Injectable()
export class QuizSetService {
  create(createQuizSetDto: CreateQuizSetDto) {
    return 'This action adds a new quizSet';
  }

  findAll() {
    return `This action returns all quizSet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quizSet`;
  }

  update(id: number, updateQuizSetDto: UpdateQuizSetDto) {
    return `This action updates a #${id} quizSet`;
  }

  remove(id: number) {
    return `This action removes a #${id} quizSet`;
  }
}
