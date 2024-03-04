/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(@InjectModel(Appointment.name) private appointmentModel: Model<Appointment>) {}
  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const existingAppointment = await this.appointmentModel.findOne({ day: createAppointmentDto.day }).exec();

    if (existingAppointment) {
        const updated = await this.appointmentModel.findOneAndUpdate(
            { day: createAppointmentDto.day },
            { timeSlots: createAppointmentDto.timeSlots },
            { new: true } 
        ).exec();

        return updated;
    } else {
        const createdAppointment = new this.appointmentModel({
            day: createAppointmentDto.day,
            timeSlots: createAppointmentDto.timeSlots,
        });

        return createdAppointment.save();
    }
}


  async findAll(): Promise<Appointment[]> {
    return this.appointmentModel.find().exec();
  }

  async findOne(id: string): Promise<Appointment> {
    const appointment = await this.appointmentModel.findById(id).exec();
    if (!appointment) {
      throw new NotFoundException(`Appointment with id ${id} not found`);
    }
    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    const existingAppointment = await this.appointmentModel.findById(id).exec();
    if (!existingAppointment) {
      throw new NotFoundException(`Appointment with id ${id} not found`);
    }

    // Assuming UpdateAppointmentDto contains fields to be updated
    existingAppointment.set({
      day: updateAppointmentDto.day || existingAppointment.day,
      timeSlots: updateAppointmentDto.timeSlots || existingAppointment.timeSlots,
    });

    return existingAppointment.save();
  }

  async remove(id: string): Promise<void> {
    const result = await this.appointmentModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Appointment with id ${id} not found`);
    }
  }
}
