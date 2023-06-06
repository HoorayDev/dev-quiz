import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CurrentUserDto {
  name: string;
  id: string;
}
export class CreateUserInputDto {
  @ApiProperty({
    description: '유저의 닉네임',
    example: '뿌요뿌요',
  })
  @IsString()
  name: string;
}

export class UserKeyInputDto {
  @ApiProperty({
    description: '유저의 uuid-key',
    example: '1234567890',
  })
  @IsString()
  key: string;
}
