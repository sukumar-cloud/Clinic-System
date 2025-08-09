import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { Doctor } from '../doctors/doctor.entity';
export declare class AppointmentService {
    private readonly appointmentRepository;
    private readonly doctorRepository;
    constructor(appointmentRepository: Repository<Appointment>, doctorRepository: Repository<Doctor>);
    findAll(): Promise<Appointment[]>;
    findOne(id: number): Promise<Appointment>;
    create(data: {
        patientName: string;
        doctorId: number;
        time: Date;
    }): Promise<Appointment>;
    update(id: number, updateData: Partial<Appointment>): Promise<Appointment>;
    remove(id: number): Promise<void>;
}
