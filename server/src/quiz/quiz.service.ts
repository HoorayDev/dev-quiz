import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizService {
  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }
}
