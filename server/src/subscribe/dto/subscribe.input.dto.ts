import { PartialType } from '@nestjs/mapped-types';

export class CreateSubscribeDto {}
export class UpdateSubscribeDto extends PartialType(CreateSubscribeDto) {}
