/* eslint-disable prettier/prettier */
export class CreateAppointmentDto {
    day: string;
    timeSlots: {
        morning: string[];
        afternoon: string[];
        evening: string[];
    };
  static day: any;
}
