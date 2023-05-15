import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@api/user/dto/user.input.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //TODO: Create Response Dto, CreateUserDto
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    //TODO: Cookie Set

    //TODO: name save
    return this.userService.create(createUserDto);
  }
}
