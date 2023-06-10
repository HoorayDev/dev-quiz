import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { JwtGuard } from '@app/share-library/guard/jwt.guard';
import { CurrentUser } from '@app/share-library/decorator/current-user';
import { CurrentUserDto } from '@api/user/dto/user.input.dto';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResponseDto } from '@app/share-library/dto/response.dto';
import { QuizParamInputDto } from '@api/quiz/dto/quiz.input.dto';
import {
  ReadAllQuizResponseDto,
  ViewReadOneQuizResponseDto,
} from '@api/quiz/dto/quiz.response.dto';

@ApiTags('quiz')
@ApiCookieAuth('id')
@UseGuards(JwtGuard)
@Controller('/quiz-set/:quizSetId/quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @ApiOperation({ summary: 'quiz 전체 조회 - 정답 포함' })
  @ApiParam({
    name: 'quizSetId',
    type: Number,
  })
  @ApiParam({
    name: 'quizId',
    type: Number,
    description: '퀴즈 ID',
  })
  @ApiResponse({
    status: 200,
    description: '퀴즈 전체 조회 성공 - 정답 포함',
    type: ReadAllQuizResponseDto,
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
  @Get()
  findAll(
    @Param() { quizSetId, quizId }: QuizParamInputDto,
    @CurrentUser() currentUser: CurrentUserDto,
  ): string {
    console.log({ quizId, currentUser, quizSetId });
    return 'This action returns all cats';
  }

  @ApiOperation({ summary: 'quiz 단일 조회' })
  @ApiParam({
    name: 'quizSetId',
    type: Number,
  })
  @ApiParam({
    name: 'quizId',
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
  @Get(':quizId')
  async findOne(
    @Param() { quizSetId, quizId }: QuizParamInputDto,
    @CurrentUser() currentUser: CurrentUserDto,
  ) {
    // TODO: 추후 HistoryService 를 만들어서 퀴즈 조회시 히스토리를 남기도록 한다.
    return this.quizService.findOne(quizId);
  }
}
