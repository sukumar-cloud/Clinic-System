import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.entity';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  findAll(): Promise<Appointment[]> {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Appointment> {
    return this.appointmentService.findOne(Number(id));
  }

  @Post()
  create(@Body() body: { patientName: string; doctorId: number; time: Date }): Promise<Appointment> {
    return this.appointmentService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() update: Partial<Appointment>): Promise<Appointment> {
    return this.appointmentService.update(Number(id), update);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.appointmentService.remove(Number(id));
  }
}
