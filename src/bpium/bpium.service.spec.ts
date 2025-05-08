import { Test, TestingModule } from '@nestjs/testing';
import { BpiumService } from './bpium.service';

describe('BpiumService', () => {
  let service: BpiumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BpiumService],
    }).compile();

    service = module.get<BpiumService>(BpiumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
