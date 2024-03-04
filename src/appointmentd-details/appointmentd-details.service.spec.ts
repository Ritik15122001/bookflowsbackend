import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentdDetailsService } from './appointmentd-details.service';

describe('AppointmentdDetailsService', () => {
  let service: AppointmentdDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentdDetailsService],
    }).compile();

    service = module.get<AppointmentdDetailsService>(AppointmentdDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
