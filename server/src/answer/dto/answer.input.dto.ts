import { PartialType } from '@nestjs/mapped-types';
export class CreateAnswerDto {}
export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {}
