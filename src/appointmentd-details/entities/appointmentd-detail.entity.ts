/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class AppointmentdDetail {
  @Prop()
  serialNo: number;

  @Prop({required:true})
   date:string;

   @Prop({ required: true, type: {
    morning: [String],
    afternoon: [String],
    evening: [String],
  } })
  bookedSlot: {
    morning: string[];
    afternoon: string[];
    evening: string[];
  };

   @Prop({required:true})
   phoneNumber:number;
}

export const AppointmentDetailsSchema = SchemaFactory.createForClass(AppointmentdDetail);
export type AppointmentDetailsDocument = AppointmentdDetail & Document;
