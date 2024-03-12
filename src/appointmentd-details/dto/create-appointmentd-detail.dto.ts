/* eslint-disable prettier/prettier */
export class CreateAppointmentdDetailDto {
  serialNo:number;
  date:string;
  bookedslot:{
    morning: string[];
    afternoon: string[];
    evening: string[];
  };
  phoneNumber:number
}
