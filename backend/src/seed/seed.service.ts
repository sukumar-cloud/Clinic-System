import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from '../doctors/doctor.entity';
import { Appointment } from '../appointments/appointment.entity';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedUsers();
    await this.seedDoctorsAndAppointments();
  }

  private async seedUsers() {
    try {
      const existing = await this.userRepo.findOne({ where: { username: 'frontdesk' } });
      if (!existing) {
        const hashed = await bcrypt.hash('frontdesk', 10);
        const user = this.userRepo.create({
          username: 'frontdesk',
          password: hashed,
          role: 'frontdesk',
        });
        await this.userRepo.save(user);
        this.logger.log("Seeded default user 'frontdesk'.");
      }
    } catch (e) {
      this.logger.error('Error seeding default user', e as any);
    }
  }

  private async seedDoctorsAndAppointments() {
    const doctorCount = await this.doctorRepo.count();
    if (doctorCount === 0) {
      const drAlice = this.doctorRepo.create({
        name: 'Dr. Alice Smith',
        specialization: 'Cardiology',
        gender: 'Female',
        location: 'Block A',
        available: true,
      });
      const drBob = this.doctorRepo.create({
        name: 'Dr. Bob Johnson',
        specialization: 'Dermatology',
        gender: 'Male',
        location: 'Block B',
        available: true,
      });

      const savedDoctors = await this.doctorRepo.save([drAlice, drBob]);
      this.logger.log(`Seeded doctors: ${savedDoctors.map(d => d.name).join(', ')}`);
    }

    const apptCount = await this.appointmentRepo.count();
    if (apptCount === 0) {
      const doctors = await this.doctorRepo.find();
      if (doctors.length === 0) return; // safety

      const now = new Date();
      const in30 = new Date(now.getTime() + 30 * 60 * 1000);

      const appt1 = this.appointmentRepo.create({
        patientName: 'John Doe',
        doctor: doctors[0],
        time: now,
        status: 'booked',
      });

      const appt2 = this.appointmentRepo.create({
        patientName: 'Jane Roe',
        doctor: doctors[Math.min(1, doctors.length - 1)],
        time: in30,
        status: 'waiting',
      });

      await this.appointmentRepo.save([appt1, appt2]);
      this.logger.log('Seeded sample appointments.');
    }
  }
}
