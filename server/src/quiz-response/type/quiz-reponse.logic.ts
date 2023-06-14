import { QuizVoteInputDto } from '@api/quiz-response/dto/quiz-response.input.dto';
import { CurrentUserDto } from '@api/user/dto/user.input.dto';

export interface CreateQuizAnswer {
  quizSetId: number;
  quizVoteInputDto: QuizVoteInputDto;
  currentUserDto: CurrentUserDto;
}
