import { Controller, Post, Body, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserInputDto } from '@api/user/dto/user.input.dto';
import {
  CreateResponseDto,
  ErrorResponseDto,
  ResultResponseDto,
} from '@app/share-library/dto/response.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@ApiTags('user')
@Controller('user')
export class UserController {
  private readonly cookieName: string;
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    this.cookieName = this.configService.get('COOKIE_SECRET');
  }

  @ApiOperation({ summary: 'user' })
  @ApiResponse({
    status: 201,
    description: '유저 생성',
    type: CreateResponseDto,
    headers: {
      'Set-Cookie': {
        description: 'cookie id set',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '유저 생성 실패',
    type: ErrorResponseDto,
  })
  @ApiBody({ type: CreateUserInputDto })
  @Post()
  async createUser(
    @Body() createUserDto: CreateUserInputDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ResultResponseDto> {
    const token = await this.userService.create(createUserDto);

    // TODO: 유저 생성 후 시험 도중에는 유저 정보를 변경할 수 없도록 해야함
    response.cookie(this.cookieName, token, {
      httpOnly: true,
      domain: this.configService.get<string>('COOKIE_DOMAIN'),
      maxAge: this.configService.get<number>('COOKIE_EXPIRES'),
    });

    return {
      result: true,
    };
  }
}
