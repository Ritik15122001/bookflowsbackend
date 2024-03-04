/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { BusinessinfoController } from './businessinfo.controller';
import { BusinessinfoService } from './businessinfo.service';

describe('BusinessinfoController', () => {
  let controller: BusinessinfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessinfoController],
      providers: [BusinessinfoService],
    }).compile();

    controller = module.get<BusinessinfoController>(BusinessinfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
