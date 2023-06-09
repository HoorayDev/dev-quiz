import { Test, TestingModule } from '@nestjs/testing';
import { QuizResponseController } from './quiz-response.controller';
import { QuizResponseService } from './quiz-response.service';

describe('QuizResponseController', () => {
  let controller: QuizResponseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizResponseController],
      providers: [QuizResponseService],
    }).compile();

    controller = module.get<QuizResponseController>(QuizResponseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
