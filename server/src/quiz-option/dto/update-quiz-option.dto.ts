import { PartialType } from '@nestjs/swagger';
import { CreateQuizOptionDto } from './create-quiz-option.dto';

export class UpdateQuizOptionDto extends PartialType(CreateQuizOptionDto) {}
