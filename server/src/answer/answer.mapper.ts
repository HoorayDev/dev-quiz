import { Injectable } from '@nestjs/common';
import { QuizVoteDto } from '@api/quiz-response/dto/quiz-response.input.dto';
export interface UserVoteToJson {
  [key: string]: number;
}

@Injectable()
export class AnswerMapper {
  userVoteToJson(userVoteList: QuizVoteDto[]): UserVoteToJson {
    return userVoteList.reduce<UserVoteToJson>((acc, userVote) => {
      const quizKey = userVote.quizId;
      acc[quizKey] = userVote.selectedOption;
      return acc;
    }, {});
  }
}
