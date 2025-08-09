import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  findAll(): Promise<Doctor[]> {
    return this.doctorRepository.find();
  }

  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOneBy({ id });
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }

  async create(doctor: Partial<Doctor>): Promise<Doctor> {
    const newDoctor = this.doctorRepository.create(doctor);
    return this.doctorRepository.save(newDoctor);
  }

  async update(id: number, updateData: Partial<Doctor>): Promise<Doctor> {
    await this.doctorRepository.update(id, updateData);
    const updated = await this.doctorRepository.findOneBy({ id });
    if (!updated) throw new NotFoundException('Doctor not found');
    return updated;
  }

  async remove(id: number): Promise<void> {
    await this.doctorRepository.delete(id);
  }
}
