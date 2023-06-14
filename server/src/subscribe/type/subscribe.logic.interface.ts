import { CurrentUserDto } from '@api/user/dto/user.input.dto';

export interface SubscribeCreateInput {
  email: string;
  currentUser: CurrentUserDto;
}
