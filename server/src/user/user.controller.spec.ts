import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from '@api/user/dto/user.input.dto';
import { faker } from '@faker-js/faker';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create User', () => {
    it('should return a new user', () => {
      const creatUser: CreateUserDto = {
        name: faker.person.fullName(),
      };
      expect(controller.create(creatUser)).toBe(
        `This action adds a new user ${creatUser.name}`,
      );
    });
  });
});
