import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { JwtGuard } from '@app/share-library/guard/jwt.guard';
import { CurrentUser } from '@app/share-library/decorator/current-user';
import { CurrentUserDto } from '@api/user/dto/user.input.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponseDto } from '@app/share-library/dto/response.dto';
import { QuizParamInputDto } from '@api/quiz/dto/quiz.input.dto';
import { ViewReadOneQuizResponseDto } from '@api/quiz/dto/quiz.response.dto';

@ApiTags('quiz')
@UseGuards(JwtGuard)
@Controller('quiz-set/:quizSetId/quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @ApiOperation({ summary: 'quiz 단일 조회' })
  @ApiParam({
    name: 'quizSetId',
    type: Number,
    description: '퀴즈 Set ID',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: '퀴즈 ID',
  })
  @ApiResponse({
    status: 200,
    description: '퀴즈 조회 성공',
    type: ViewReadOneQuizResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: '퀴즈가 없음',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: '권한 없음',
    type: ErrorResponseDto,
  })
  @Get(':id')
  findOne(
    @Param() { quizSetId, id }: QuizParamInputDto,
    @CurrentUser() currentUser: CurrentUserDto,
  ) {
    console.log({ quizSetId, id, currentUser });
    return this.quizService.findOne(+id);
  }
}
