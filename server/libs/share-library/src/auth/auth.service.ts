import { Injectable } from '@nestjs/common';
import { AuthClassInterface } from '@app/share-library/src/auth/type/auth.class.interface';
import { v4 } from 'uuid';

@Injectable()
export class AuthService implements AuthClassInterface {
  generateUUIDv4(): string {
    return v4();
  }
}
