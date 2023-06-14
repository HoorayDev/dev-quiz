import { Injectable } from '@nestjs/common';
import { AnswerService } from '@api/answer/answer.service';
import { QuizResponseRepository } from '@api/quiz-response/quiz-response.repository';
import { QuizResponseEntity } from '@app/share-library/entities/question/quiz-response.entity';
import { CreateQuizAnswer } from '@api/quiz-response/type/quiz-reponse.logic';

@Injectable()
export class QuizResponseService {
  constructor(
    private readonly answerService: AnswerService,
    private readonly quizResponseRepository: QuizResponseRepository,
  ) {}
  async create({
    quizSetId,
    quizVoteInputDto,
    currentUserDto,
  }: CreateQuizAnswer) {
    console.log(currentUserDto);
    // 점수 측정
    const data = await this.answerService.scoring(quizSetId, quizVoteInputDto);

    // 유저 정답 저장 & is correct 저장
    const responseEntities = quizVoteInputDto.userVoteList.map((value) => {
      return QuizResponseEntity.create({
        user: {
          id: currentUserDto.id,
        },
        quiz: {
          id: value.quizId,
        },
        quiz_option: value.selectedOption,
        user_is_correct: data.correctMap[value.quizId],
      });
    });
    await this.quizResponseRepository.createMany(responseEntities);

    // 점수 값 반환
    return data;
  }
}
