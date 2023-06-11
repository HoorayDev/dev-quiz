import { PartialType } from '@nestjs/mapped-types';
export class CreateQuizSetDto {}

export class UpdateQuizSetDto extends PartialType(CreateQuizSetDto) {}
