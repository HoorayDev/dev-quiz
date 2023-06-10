import { Injectable } from '@nestjs/common';
import { QuizSetEntity } from '@app/share-library/entities/question/quiz-set.entity';
import { plainToInstance } from 'class-transformer';
import {
  BaseQuizSetEntity,
  ReadOneQuizSetResponseWithQuizListDto,
} from '@api/quiz-set/dto/quiz-set.response.dto';
import {
  ReadAllResponseQuizSet,
  ReadAllResponseQuizSetDto,
} from '@api/quiz-set/type/quiz-set.class.interface';
import { QuizSetWithQuizListDto } from '@api/quiz-set/type/quiz-set.logic';

@Injectable()
export class QuizSetMapper {
  entityListToQuizSetDtoList(data: ReadAllResponseQuizSet) {
    return plainToInstance(ReadAllResponseQuizSetDto, {
      list: data.list.map((item) => this.entityToQuizSetDto(item)),
      count: data.count,
      currentPage: data.currentPage,
      totalPage: data.totalPage,
    });
  }

  entityToQuizSetDto({
    created_at,
    updated_at,
    tag,
    ...data
  }: QuizSetEntity): BaseQuizSetEntity {
    // TODO: plainToInstance 가 현재 whitelist 가 동작하지 않는다. 그래서 필요한 column 만 추출 하여, 넣어준다. 추후 파악 이후에 issue 등록
    return plainToInstance(BaseQuizSetEntity, {
      createdAt: created_at,
      updatedAt: updated_at,
      ...data,
    });
  }

  // QuizSetWithQuizListDto => ReadOneQuizSetResponseWithQuizListDto
  toQuizSetDtoWithQuizList(
    data: QuizSetWithQuizListDto,
  ): ReadOneQuizSetResponseWithQuizListDto {
    const isExistQuizIdList = data?.quizIdList;
    const quizIdList = isExistQuizIdList
      ? data.quizIdList.split(',').map((value) => Number(value))
      : [];
    const quizCount = isExistQuizIdList ? quizIdList.length : 0;

    return plainToInstance(ReadOneQuizSetResponseWithQuizListDto, {
      id: data.id,
      title: data.title,
      category: data.category,
      level: data.level,
      description: data.description,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      quizIdList: quizIdList,
      quizCount: quizCount,
    });
  }
}
