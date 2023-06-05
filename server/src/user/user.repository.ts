import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@app/share-library/entities/user/user.entity';

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: typeof UserEntity,
  ) {}
}
