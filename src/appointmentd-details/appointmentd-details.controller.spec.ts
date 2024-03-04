import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentdDetailsController } from './appointmentd-details.controller';
import { AppointmentdDetailsService } from './appointmentd-details.service';

describe('AppointmentdDetailsController', () => {
  let controller: AppointmentdDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentdDetailsController],
      providers: [AppointmentdDetailsService],
    }).compile();

    controller = module.get<AppointmentdDetailsController>(AppointmentdDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
