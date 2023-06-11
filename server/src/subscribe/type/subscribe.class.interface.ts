import { UserKeyInputDto } from '@api/user/dto/user.input.dto';
import { SubscribeEntity } from '@app/share-library/entities/user/subscribe.entity';

export interface SubscribeServiceInterface {
  create(userKey: UserKeyInputDto): SubscribeEntity;
}
