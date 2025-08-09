import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Doctor } from '../doctors/doctor.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientName: string;

  @ManyToOne(() => Doctor, { eager: true })
  doctor: Doctor;

  @Column()
  time: Date;

  @Column({ default: 'booked' })
  status: string; // booked, rescheduled, cancelled, completed
}
