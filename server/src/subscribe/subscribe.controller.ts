import { Controller, Post } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateResponseDto } from '@app/share-library/dto/response.dto';

@ApiTags('subscribe')
@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @ApiOperation({ summary: 'Subscribe Create' })
  @ApiResponse({
    status: 201,
    description: '구독 생성',
    type: CreateResponseDto,
    headers: {
      'Set-Cookie': {
        description: 'cookie id set',
      },
    },
  })
  @Post()
  create() {
    // TODO: 로그인 체크
    // TODO: 구독 여부 체크 후 멱등성 유지
    return this.subscribeService.create({});
  }
}
