import { Test, TestingModule } from '@nestjs/testing';
import { CarsGateway } from './cars.gateway';

describe('CarsGateway', () => {
  let gateway: CarsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarsGateway],
    }).compile();

    gateway = module.get<CarsGateway>(CarsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
