import { Injectable } from '@nestjs/common';
import { AuthClassInterface } from '@app/share-library/src/auth/type/auth.class.interface';
import { v4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements AuthClassInterface {
  constructor(private readonly jwtService: JwtService) {}
  generateUUIDv4(): string {
    return v4();
  }

  signJWT(payload: any): string {
    const token = this.jwtService.sign(
      {
        id: payload.id,
        name: payload.name,
      },
      {
        secret: process.env.JWT_SECRET,
      },
    );
    console.log(token);
    return token;
  }

  verifyJWT(token: string): Promise<any> {
    return Promise.resolve(undefined);
  }
}
