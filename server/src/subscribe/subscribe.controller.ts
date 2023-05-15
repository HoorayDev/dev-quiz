import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateSubscribeDto,
  UpdateSubscribeDto,
} from '@api/subscribe/dto/subscribe.input.dto';

@ApiTags('subscribe')
@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  // TODO: 로그인 체크
  // TODO: 구독 여부 체크 후 멱등성 유지
  @Post()
  create(@Body() createSubscribeDto: CreateSubscribeDto) {
    return this.subscribeService.create(createSubscribeDto);
  }

}
