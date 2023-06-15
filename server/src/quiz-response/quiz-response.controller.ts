import { Controller, Post, Body, UseGuards, Param } from '@nestjs/common';
import { QuizResponseService } from './quiz-response.service';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '@app/share-library/guard/jwt.guard';
import { QuizVoteResponseDto } from '@api/quiz-response/dto/quiz-response.response.dto';
import { QuizVoteInputDto } from '@api/quiz-response/dto/quiz-response.input.dto';
import { CurrentUser } from '@app/share-library/decorator/current-user';
import { CurrentUserDto } from '@api/user/dto/user.input.dto';

@ApiTags('quiz-response')
@ApiCookieAuth('id')
@UseGuards(JwtGuard)
@Controller('/quiz-set/:quizSetId/response')
export class QuizResponseController {
  constructor(private readonly quizResponseService: QuizResponseService) {}

  @ApiOperation({ summary: 'quiz-response 생성' })
  @ApiResponse({
    status: 200,
    description: 'quiz-response 생성',
    type: QuizVoteResponseDto,
  })
  @ApiResponse({
    status: 200,
    description: 'quiz-response 오류',
  })
  @ApiBody({
    description: '유저 제출 답안',
    type: () => [QuizVoteInputDto],
  })
  @Post()
  async create(
    @Param('quizSetId') quizSetId: number,
    @Body() quizVoteInputDto: QuizVoteInputDto,
    @CurrentUser() currentUserDto: CurrentUserDto,
  ) {
    return await this.quizResponseService.create({
      quizSetId,
      quizVoteInputDto,
      currentUserDto,
    });
  }
}
