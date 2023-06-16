import { PartialType } from '@nestjs/mapped-types';
import { IsEmail } from 'class-validator';

export class CreateSubscribeInputDto {
  @IsEmail()
  email: string;
}
export class UpdateSubscribeDto extends PartialType(CreateSubscribeInputDto) {}
