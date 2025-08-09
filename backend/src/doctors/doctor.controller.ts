import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Doctor } from './doctor.entity';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  findAll(): Promise<Doctor[]> {
    return this.doctorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Doctor> {
    return this.doctorService.findOne(Number(id));
  }

  @Post()
  create(@Body() doctor: Partial<Doctor>): Promise<Doctor> {
    return this.doctorService.create(doctor);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() doctor: Partial<Doctor>): Promise<Doctor> {
    return this.doctorService.update(Number(id), doctor);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.doctorService.remove(Number(id));
  }
}
