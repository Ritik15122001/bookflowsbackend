/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentdDetailsService } from './appointmentd-details.service';
import { CreateAppointmentdDetailDto } from './dto/create-appointmentd-detail.dto';
import { UpdateAppointmentdDetailDto } from './dto/update-appointmentd-detail.dto';

@Controller('appointment-details')
export class AppointmentdDetailsController {
  constructor(private readonly appointmentdDetailsService: AppointmentdDetailsService) {}

  @Post()
  create(@Body() createAppointmentdDetailDto: CreateAppointmentdDetailDto) {
    return this.appointmentdDetailsService.create(createAppointmentdDetailDto);
  }

  @Get()
  findAll() {
    return this.appointmentdDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentdDetailsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentdDetailDto: UpdateAppointmentdDetailDto) {
    return this.appointmentdDetailsService.update(+id, updateAppointmentdDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentdDetailsService.remove(id);
  }
}
