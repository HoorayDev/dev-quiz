import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserInputDto } from '@api/user/dto/user.input.dto';
import { CreateResponseDto } from '@app/share-library/dto/response.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  @ApiBody({ type: CreateUserInputDto })
  @Post()
  async(@Body() createUserDto: CreateUserInputDto): Promise<string> {
    //TODO: 코드 다시 짜기 ( DTO, Service, Controller )
    //TODO: Create Response Dto, CreateUserDto
    //TODO: Cookie Set
    //TODO: name save

    return this.userService.create(createUserDto);
  }
}
