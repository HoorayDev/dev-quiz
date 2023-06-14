import { Injectable } from '@nestjs/common';
import { CurrentUserDto } from '@api/user/dto/user.input.dto';
import { SubscribeRepository } from '@api/subscribe/subscribe.repository';
import { SubscribeCreateInput } from '@api/subscribe/type/subscribe.logic.interface';
import { SubscribeEntity } from '@app/share-library/entities/user/subscribe.entity';
import { DataSource } from 'typeorm';
import { UserService } from '@api/user/user.service';

@Injectable()
export class SubscribeService {
  constructor(
    private readonly subscribeRepository: SubscribeRepository,
    private readonly userService: UserService,
    private readonly dataSource: DataSource,
  ) {}
  async create({ email, currentUser }: SubscribeCreateInput): Promise<boolean> {
    const findSubscribe = await this.findOneByUserId(currentUser);
    const isExist = !!findSubscribe;
    if (!isExist) {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      try {
        await queryRunner.startTransaction();
        const entityManager = queryRunner.manager;
        const subscribe = await this.subscribeRepository.createWithTransaction(
          currentUser,
          entityManager,
        );
        if (!subscribe) throw new Error('subscribe 생성 실패');
        const updateOneUser =
          await this.userService.updateSubscribeEmailWithTransaction(
            {
              email: email,
              id: currentUser.id,
            },
            entityManager,
          );
        if (!updateOneUser) throw new Error('user subscribe_id update 실패');
        await queryRunner.commitTransaction();
      } catch (e) {
        await queryRunner.rollbackTransaction();
        throw e;
      } finally {
        await queryRunner.release();
      }
    }
    return true;
  }

  async findOneByUserId({ id }: CurrentUserDto): Promise<SubscribeEntity> {
    return await this.subscribeRepository.findOneByUserId(id);
  }
}
