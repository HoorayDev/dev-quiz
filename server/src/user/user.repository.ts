import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@app/share-library/entities/user/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ReadAllResponse,
  RepositoryInterface,
} from '@app/share-library/type/class.interface';
import { UserLogicInterface } from '@api/user/type/user.logic.interface';
import {
  CreateUserInputDto,
  UpdateUserInputDto,
} from '@api/user/dto/user.input.dto';
import { EntityManager } from 'typeorm';

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

  findAll(filter: UserLogicInterface): Promise<ReadAllResponse<UserEntity>> {
    return Promise.resolve(undefined);
  }

  findOneWithFilter(
    key: string,
    filter: UserLogicInterface,
  ): Promise<UserEntity> {
    return Promise.resolve(undefined);
  }

  findOneWithKey(key: string): Promise<UserEntity> {
    return Promise.resolve(undefined);
  }

  remove(key: string): Promise<string> {
    return Promise.resolve(undefined);
  }

  update({
    key,
    prop,
  }: {
    key: string;
    prop: UserEntity;
  }): Promise<UserEntity> {
    return Promise.resolve(undefined);
  }

  async updateSubscribeEmailWithTransaction(
    updateUserDto: UpdateUserInputDto,
    entityManager: EntityManager,
  ) {
    return await entityManager.update(UserEntity, updateUserDto.id, {
      email: updateUserDto.email,
    });
  }
}
