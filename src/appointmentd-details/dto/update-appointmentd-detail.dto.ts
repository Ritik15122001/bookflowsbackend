import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentdDetailDto } from './create-appointmentd-detail.dto';

export class UpdateAppointmentdDetailDto extends PartialType(CreateAppointmentdDetailDto) {}
