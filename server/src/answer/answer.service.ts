import { BadRequestException, Injectable } from '@nestjs/common';
import { AnswerRepository } from '@api/answer/answer.repository';
import { QuizVoteInputDto } from '@api/quiz-response/dto/quiz-response.input.dto';
import { AnswerMapper } from '@api/answer/answer.mapper';
import { QuizVoteResponseDto } from '@api/quiz-response/dto/quiz-response.response.dto';

@Injectable()
export class AnswerService {
  constructor(
    private readonly answerRepository: AnswerRepository,
    private readonly answerMapper: AnswerMapper,
  ) {}

  /**
   * 정답지를 가져와 유저의 답안을 측정하여 반환합니다.
   */
  async scoring(
    quizSetId: number,
    { userVoteList }: QuizVoteInputDto,
  ): Promise<QuizVoteResponseDto> {
    const answers = await this.getAnswer(quizSetId);
    this.scoreLogicGuard(answers, userVoteList);
    const userVoteToJson = this.answerMapper.userVoteToJson(userVoteList);

    const scoreCheck = answers.reduce(
      (acc, answer) => {
        const { quiz_id, answer_value } = answer;
        const userVote = userVoteToJson[quiz_id];
        const isCorrect = userVote === answer_value;
        if (isCorrect) {
          acc.correctCount += 1;
        } else {
          acc.inCorrectCount += 1;
        }
        acc.correctMap[quiz_id] = isCorrect;
        acc.totalCount += 1;
        return acc;
      },
      {
        correctCount: 0,
        inCorrectCount: 0,
        totalCount: 0,
        correctMap: {},
      },
    );
    const correctPercentage = Math.round(
      (scoreCheck.correctCount / scoreCheck.totalCount) * 100,
    );

    const userScore = {
      ...scoreCheck,
      correctPercentage,
      inCorrectPercentage: 100 - correctPercentage,
    };
    return userScore;
  }

  private scoreLogicGuard(answers, userVoteList) {
    if (answers.length === 0) {
      throw new BadRequestException('정답지가 없습니다.');
    }
    if (answers.length !== userVoteList.length) {
      throw new BadRequestException('정답지와 제출한 답안의 길이가 다릅니다.');
    }
  }

  private async getAnswer(quizSetId: number) {
    return await this.answerRepository.getAnswer(quizSetId);
  }
}
