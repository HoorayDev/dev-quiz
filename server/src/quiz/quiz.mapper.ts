import { Injectable } from '@nestjs/common';
import { QuizEntity } from '@app/share-library/entities/question/quiz.entity';
import { ViewReadOneQuizDto } from '@api/quiz/dto/quiz.response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class QuizMapper {
  toViewQuizDto(quiz: QuizEntity): ViewReadOneQuizDto {
    return plainToInstance(ViewReadOneQuizDto, {
      id: quiz.id,
      quiz_set_id: quiz.quiz_set.id,
      title: quiz.title,
      content: quiz.content,
      code: quiz.code,
      description: quiz.description,
      createdAt: quiz.created_at,
      updatedAt: quiz.updated_at,
    });
  }
}
