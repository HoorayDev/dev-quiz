import { PartialType } from '@nestjs/mapped-types';
import { UserEntity } from '@app/share-library/entities/user/user.entity';

export class UserLogicInterface extends PartialType(UserEntity) {}
