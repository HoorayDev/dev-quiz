import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckDto } from '@app/share-library/dto/health.dto';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('healthCheck', () => {
    it('should return "{ result: true }"', () => {
      const healthCheck = appController.healthCheck;

      // return value
      const expected: HealthCheckDto = {
        result: true,
      };

      // check return type
      expect(healthCheck()).toEqual(expected);
      // check return property
      expect(healthCheck()).toHaveProperty('result');
    });
  });
});
