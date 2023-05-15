import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: '유저의 닉네임',
    example: '뿌요뿌요',
  })
  @IsString()
  name: string;
}
