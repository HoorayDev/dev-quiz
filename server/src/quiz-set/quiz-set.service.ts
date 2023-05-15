import { Injectable } from '@nestjs/common';
import { CreateQuizSetDto } from './dto/create-quiz-set.dto';
import { UpdateQuizSetDto } from './dto/update-quiz-set.dto';

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
