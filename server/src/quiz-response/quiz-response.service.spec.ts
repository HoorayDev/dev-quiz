import { Test, TestingModule } from '@nestjs/testing';
import { QuizResponseService } from './quiz-response.service';

describe('QuizResponseService', () => {
  let service: QuizResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizResponseService],
    }).compile();

    service = module.get<QuizResponseService>(QuizResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
