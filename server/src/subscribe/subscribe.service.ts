import { Injectable } from '@nestjs/common';
import {
  CreateSubscribeDto,
  UpdateSubscribeDto,
} from '@api/subscribe/dto/subscribe.input.dto';

@Injectable()
export class SubscribeService {
  create(createSubscribeDto: CreateSubscribeDto) {
    return 'This action adds a new subscribe';
  }

  findAll() {
    return `This action returns all subscribe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscribe`;
  }

  update(id: number, updateSubscribeDto: UpdateSubscribeDto) {
    return `This action updates a #${id} subscribe`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscribe`;
  }
}
