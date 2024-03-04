/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ required: true })
  day: string;

  @Prop({ required: true, type: {
    morning: [String],
    afternoon: [String],
    evening: [String],
  } })
  timeSlots: {
    morning: string[];
    afternoon: string[];
    evening: string[];
  };
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
export type AppointmentDocument = Appointment & Document;
