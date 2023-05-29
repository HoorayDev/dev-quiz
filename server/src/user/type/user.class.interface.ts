import {
  CreateUserInputDto,
  UserKeyInputDto,
} from '@api/user/dto/user.input.dto';

export interface UserServiceInterface {
  create(user: CreateUserInputDto): string;
  findAll(userKey: UserKeyInputDto): string;
}
