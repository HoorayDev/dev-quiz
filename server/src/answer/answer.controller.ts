import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateAnswerDto,
  UpdateAnswerDto,
} from '@api/answer/dto/answer.input.dto';

@ApiTags('answer')
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  // TODO: 정답 제출 ( quiz-id, value 에 대한 Array 전달 받음 )
  // TODO: 정답 여부 체크 in Answer 데이터
  // TODO: quiz-response 에 O / X 기록
  // TODO: 선택지 2 ( 그냥 성공 여부를 보낼지, get :id )와 같게 동작할지, 전자로 할 가능 성 높음
  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.create(createAnswerDto);
  }

  // TODO: 로그연 여부 체크

  // TODO: 정답 여부에 대한 정보를 보내주어야 함
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerService.findOne(+id);
  }
}
