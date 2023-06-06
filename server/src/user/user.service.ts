import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateUserInputDto,
  CurrentUserDto,
} from '@api/user/dto/user.input.dto';
import { UserRepository } from '@api/user/user.repository';
import { AuthService } from '@app/share-library/src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}
  async create(createUserDto: CreateUserInputDto): Promise<string> {
    const user = await this.userRepository.create(createUserDto);
    return this.authService.signJWT(user);
  }
}
