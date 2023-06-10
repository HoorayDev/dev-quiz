import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateResponseDto } from '@app/share-library/dto/response.dto';
import { description } from '@app/share-library/enum/operation.enum';
import { JwtGuard } from '@app/share-library/guard/jwt.guard';
import { CurrentUser } from '@app/share-library/decorator/current-user';
import { CurrentUserDto } from '@api/user/dto/user.input.dto';
import { CreateSubscribeInputDto } from '@api/subscribe/dto/subscribe.input.dto';

@ApiTags('subscribe')
@UseGuards(JwtGuard)
@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @ApiOperation(description.SUBSCRIBE.CREATE)
  @ApiResponse({
    status: 201,
    description: description.SUBSCRIBE.CREATE.description,
    type: CreateResponseDto,
    headers: {
      'Set-Cookie': {
        description: 'cookie id set',
      },
    },
  })
  @ApiBody({
    description: 'Subscribe 에는 User 의 Email 이 필요합니다.',
    type: CreateSubscribeInputDto,
  })
  @Post()
  async create(
    @CurrentUser() currentUser: CurrentUserDto,
    @Body() { email }: CreateSubscribeInputDto,
  ) {
    const result = await this.subscribeService.create({
      email,
      currentUser,
    });
    return {
      result,
    };
  }
}
