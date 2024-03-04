import { Test, TestingModule } from '@nestjs/testing';
import { BusinessinfoService } from './businessinfo.service';

describe('BusinessinfoService', () => {
  let service: BusinessinfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessinfoService],
    }).compile();

    service = module.get<BusinessinfoService>(BusinessinfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
