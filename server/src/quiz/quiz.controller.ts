import { Controller, Get, Param, UseGuards } from '@nestjs/common';
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
  ReadOneQuizDto,
  ViewReadOneQuizResponseDto,
} from '@api/quiz/dto/quiz.response.dto';
import { ReadAllResponse } from '@app/share-library/type/class.interface';

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
  async findAll(
    @Param('quizSetId') quizSetId: string,
    @CurrentUser() currentUser: CurrentUserDto,
  ): Promise<ReadAllResponse<ReadOneQuizDto>> {
    // TODO: 추후 퀴즈 셋에서 UserResponse Property 에 대한 역할 분리 -> option or response 가 권한을 가져야 함
    return await this.quizService.findAll({ currentUser, quizSetId });
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
