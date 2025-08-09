import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { Doctor } from '../doctors/doctor.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({ where: { id } });
    if (!appointment) throw new NotFoundException('Appointment not found');
    return appointment;
  }

  async create(data: { patientName: string; doctorId: number; time: Date }): Promise<Appointment> {
    const doctor = await this.doctorRepository.findOne({ where: { id: data.doctorId } });
    if (!doctor) throw new NotFoundException('Doctor not found');
    const appointment = this.appointmentRepository.create({
      patientName: data.patientName,
      doctor,
      time: data.time,
      status: 'booked',
    });
    return this.appointmentRepository.save(appointment);
  }

  async update(id: number, updateData: Partial<Appointment>): Promise<Appointment> {
    await this.appointmentRepository.update(id, updateData);
    const updated = await this.appointmentRepository.findOne({ where: { id } });
    if (!updated) throw new NotFoundException('Appointment not found');
    return updated;
  }

  async remove(id: number): Promise<void> {
    await this.appointmentRepository.delete(id);
  }
}
