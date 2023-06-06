import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '@app/share-library/src/auth/auth.module';
import { UserRepository } from '@api/user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/share-library/entities/user/user.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
