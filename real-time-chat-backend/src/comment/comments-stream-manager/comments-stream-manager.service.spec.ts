import { Test, TestingModule } from '@nestjs/testing';
import { CommentsStreamManagerService } from './comments-stream-manager.service';

describe('CommentsStreamManagerService', () => {
  let service: CommentsStreamManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsStreamManagerService],
    }).compile();

    service = module.get<CommentsStreamManagerService>(CommentsStreamManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
