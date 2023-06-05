import { Injectable } from '@nestjs/common';
import { CreateUserInputDto } from '@api/user/dto/user.input.dto';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserInputDto): Promise<string> {
    return `This action adds a new user ${createUserDto.name}`;
  }
}
