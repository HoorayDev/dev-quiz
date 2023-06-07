import { Injectable } from '@nestjs/common';
import { CreateQuizOptionDto } from './dto/create-quiz-option.dto';
import { UpdateQuizOptionDto } from './dto/update-quiz-option.dto';

@Injectable()
export class QuizOptionService {
  create(createQuizOptionDto: CreateQuizOptionDto) {
    return 'This action adds a new quizOption';
  }

  findAll() {
    return `This action returns all quizOption`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quizOption`;
  }

  update(id: number, updateQuizOptionDto: UpdateQuizOptionDto) {
    return `This action updates a #${id} quizOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} quizOption`;
  }
}
