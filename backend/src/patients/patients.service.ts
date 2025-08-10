import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
  ) {}

  findAll(): Promise<Patient[]> {
    return this.patientRepo.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number): Promise<Patient> {
    const p = await this.patientRepo.findOne({ where: { id } });
    if (!p) throw new NotFoundException('Patient not found');
    return p;
  }

  create(data: Partial<Patient>): Promise<Patient> {
    const p = this.patientRepo.create(data);
    return this.patientRepo.save(p);
  }

  async update(id: number, data: Partial<Patient>): Promise<Patient> {
    await this.patientRepo.update(id, data);
    const p = await this.patientRepo.findOne({ where: { id } });
    if (!p) throw new NotFoundException('Patient not found');
    return p;
  }

  async remove(id: number): Promise<void> {
    await this.patientRepo.delete(id);
  }
}
