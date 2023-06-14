import { Module } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { SubscribeController } from './subscribe.controller';
import { SubscribeRepository } from '@api/subscribe/subscribe.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscribeEntity } from '@app/share-library/entities/user/subscribe.entity';
import { UserModule } from '@api/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([SubscribeEntity]), UserModule],
  controllers: [SubscribeController],
  providers: [SubscribeService, SubscribeRepository],
  exports: [SubscribeService],
})
export class SubscribeModule {}
