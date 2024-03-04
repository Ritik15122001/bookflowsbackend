/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppointmentdDetailsService } from './appointmentd-details.service';
import { AppointmentdDetailsController } from './appointmentd-details.controller';
import { AppointmentdDetail,AppointmentDetailsSchema } from './entities/appointmentd-detail.entity';import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AppointmentdDetail.name, schema: AppointmentDetailsSchema }]),
    ],
  controllers: [AppointmentdDetailsController],
  providers: [AppointmentdDetailsService],
})
export class AppointmentdDetailsModule {}
