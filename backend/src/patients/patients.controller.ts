import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { Patient } from './patient.entity';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  findAll(): Promise<Patient[]> {
    return this.patientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Patient> {
    return this.patientsService.findOne(Number(id));
  }

  @Post()
  create(@Body() data: Partial<Patient>): Promise<Patient> {
    return this.patientsService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Patient>): Promise<Patient> {
    return this.patientsService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.patientsService.remove(Number(id));
  }
}
