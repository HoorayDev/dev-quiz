import { Test, TestingModule } from '@nestjs/testing';
import { ShareLibraryService } from './share-library.service';

describe('ShareLibraryService', () => {
  let service: ShareLibraryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShareLibraryService],
    }).compile();

    service = module.get<ShareLibraryService>(ShareLibraryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
