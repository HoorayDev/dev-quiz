import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class QuizParamInputDto {
  @IsNumber()
  @Type(() => Number)
  id: number;

  @IsNumber()
  @Type(() => Number)
  quizSetId: number;
}
