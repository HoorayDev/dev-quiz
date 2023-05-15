import { PartialType } from '@nestjs/mapped-types';
export class CreateQuizDto {}
export class UpdateQuizDto extends PartialType(CreateQuizDto) {}
