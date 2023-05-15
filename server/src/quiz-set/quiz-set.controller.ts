import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { QuizSetService } from './quiz-set.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('quiz-set')
@Controller('quiz-set')
export class QuizSetController {
  constructor(private readonly quizSetService: QuizSetService) {}

  // TODO: 기본적인 정보만 뿌려주는 API 화
  @Get()
  findAll() {
    return this.quizSetService.findAll();
  }

  // TODO: 퀴즈 Set 조회
  // TODO: 닉네임 생성 여부 체크
  // TODO: 확인 이후, 퀴즈 Set 조회 ( Detail, Quiz, Option )
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizSetService.findOne(+id);
  }

}
