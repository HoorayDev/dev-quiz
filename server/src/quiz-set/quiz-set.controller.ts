import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuizSetService } from './quiz-set.service';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateQuizSetDto,
  UpdateQuizSetDto,
} from '@api/quiz-set/dto/quiz-set.input.dto';

@ApiTags('quiz-set')
@Controller('quiz-set')
export class QuizSetController {
  constructor(private readonly quizSetService: QuizSetService) {}

  @Post()
  create(@Body() createQuizSetDto: CreateQuizSetDto) {
    return this.quizSetService.create(createQuizSetDto);
  }

  @Get()
  findAll() {
    return this.quizSetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizSetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizSetDto: UpdateQuizSetDto) {
    return this.quizSetService.update(+id, updateQuizSetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizSetService.remove(+id);
  }
}
