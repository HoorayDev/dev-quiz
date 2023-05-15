import { Test, TestingModule } from '@nestjs/testing';
import { QuizSetService } from './quiz-set.service';

describe('QuizSetService', () => {
  let service: QuizSetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizSetService],
    }).compile();

    service = module.get<QuizSetService>(QuizSetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
