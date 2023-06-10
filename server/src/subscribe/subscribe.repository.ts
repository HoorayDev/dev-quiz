import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscribeEntity } from '@app/share-library/entities/user/subscribe.entity';
import { EntityManager, Repository } from 'typeorm';
import { CurrentUserDto } from '@api/user/dto/user.input.dto';

@Injectable()
export class SubscribeRepository {
  constructor(
    @InjectRepository(SubscribeEntity)
    private readonly subscribeRepository: Repository<SubscribeEntity>,
  ) {}

  async create(currentUser: CurrentUserDto) {
    const subscribe = SubscribeEntity.create({
      subscribed: true,
      user: {
        id: currentUser.id,
      },
    });
    const result = await this.subscribeRepository.save(subscribe);
    console.log(result);
    return true;
  }

  async createWithTransaction(
    currentUser: CurrentUserDto,
    entityManager: EntityManager,
  ) {
    const subscribe = SubscribeEntity.create({
      subscribed: true,
      user: {
        id: currentUser.id,
      },
    });
    const result = await entityManager.save(SubscribeEntity, subscribe);
    console.log(result);
    return true;
  }

  async findOneByUserId(userId: string): Promise<SubscribeEntity> {
    return await this.subscribeRepository
      .createQueryBuilder('subscribe')
      .where('subscribe.user_id = :userId', { userId })
      .getOne();
  }
}
