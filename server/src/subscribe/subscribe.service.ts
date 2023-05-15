import { Injectable } from '@nestjs/common';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { UpdateSubscribeDto } from './dto/update-subscribe.dto';

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
