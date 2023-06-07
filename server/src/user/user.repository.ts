import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@app/share-library/entities/user/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RepositoryInterface } from '@app/share-library/type/class.interface';
import { UserLogicInterface } from '@api/user/type/user.logic.interface';
import { CreateUserInputDto } from '@api/user/dto/user.input.dto';

@Injectable()
export class UserRepository
  implements RepositoryInterface<UserEntity, string, UserLogicInterface>
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: typeof UserEntity,
  ) {}

  async create({ name }: CreateUserInputDto): Promise<UserEntity> {
    try {
      const user = UserEntity.create({
        name,
      });
      return await this.userRepository.save(user);
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('이미 존재하는 유저입니다.');
      } else {
        throw e;
      }
    }
  }

  findAll(filter: UserLogicInterface): UserEntity[] {
    return [];
  }

  findOneWithKey(key: string): UserEntity {
    return undefined;
  }

  remove(key: string): UserEntity {
    return undefined;
  }

  update({ key, prop }: { key: string; prop: UserEntity }): UserEntity {
    return undefined;
  }

  findOneWithFilter(key: string, filter: UserLogicInterface): UserEntity {
    return undefined;
  }
}