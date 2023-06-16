import { Injectable } from '@nestjs/common';
import { QuizOptionEntity } from '@app/share-library/entities/question/quiz-option.entity';
import { ReadOneQuizOptionResponseDto } from '@api/quiz-option/dto/quiz-option.response.dto';

@Injectable()
export class QuizOptionMapper {
  entityToReadOneQuizOptionDto(entity: QuizOptionEntity) {
    const readOneDto = new ReadOneQuizOptionResponseDto();
    readOneDto.id = entity.id;
    readOneDto.content = entity.content;
    readOneDto.value = entity.value;
    readOneDto.createdAt = entity.created_at;
    readOneDto.updatedAt = entity.updated_at;
    return readOneDto;
  }

  entityToReadOneQuizOptionDtoList(entities: QuizOptionEntity[]) {
    return entities.map<ReadOneQuizOptionResponseDto>(
      (entity: QuizOptionEntity) => {
        return this.entityToReadOneQuizOptionDto(entity);
      },
    );
  }
}
