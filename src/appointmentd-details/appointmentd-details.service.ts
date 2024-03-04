/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAppointmentdDetailDto } from './dto/create-appointmentd-detail.dto';
import { UpdateAppointmentdDetailDto } from './dto/update-appointmentd-detail.dto';
import { AppointmentdDetail } from './entities/appointmentd-detail.entity';

@Injectable()
export class AppointmentdDetailsService {
  constructor(@InjectModel(AppointmentdDetail.name) private appointmentdDetailModel: Model<AppointmentdDetail>) {}

  async create(createAppointmentdDetailDto: CreateAppointmentdDetailDto): Promise<AppointmentdDetail> {
      const createdAppointmentdDetail = new this.appointmentdDetailModel(createAppointmentdDetailDto);
      return createdAppointmentdDetail.save();
    
  }

  async findAll(): Promise<AppointmentdDetail[]> {
    return this.appointmentdDetailModel.find().exec();
  }

  async findOne(id: string): Promise<AppointmentdDetail> {
    const appointmentdDetail = await this.appointmentdDetailModel.findById(id).exec();
    if (!appointmentdDetail) {
      throw new NotFoundException(`Appointment Detail with serialNo ${id} not found`);
    }
    return appointmentdDetail;
  }

  async update(serialNo: number, updateAppointmentdDetailDto: UpdateAppointmentdDetailDto): Promise<AppointmentdDetail> {
    const existingAppointmentdDetail = await this.appointmentdDetailModel.findOne({ serialNo }).exec();
    if (!existingAppointmentdDetail) {
      throw new NotFoundException(`Appointment Detail with serialNo ${serialNo} not found`);
    }

    // Assuming UpdateAppointmentdDetailDto contains fields to be updated
    existingAppointmentdDetail.set({
      date: updateAppointmentdDetailDto.date || existingAppointmentdDetail.date,
      bookedSlot: updateAppointmentdDetailDto.bookedslot || existingAppointmentdDetail.bookedSlot,
      phoneNumber: updateAppointmentdDetailDto.phoneNumber || existingAppointmentdDetail.phoneNumber,
    });

    return existingAppointmentdDetail.save();
  }

  async remove(id: string): Promise<void> {
    const result = await this.appointmentdDetailModel.deleteOne({_id:id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Appointment Detail with serialNo ${id} not found`);
    }
  }
}
