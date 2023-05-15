import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@api/user/dto/user.input.dto';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
}
