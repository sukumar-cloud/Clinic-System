import { OnApplicationBootstrap } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Doctor } from '../doctors/doctor.entity';
import { Appointment } from '../appointments/appointment.entity';
export declare class SeedService implements OnApplicationBootstrap {
    private readonly doctorRepo;
    private readonly appointmentRepo;
    private readonly logger;
    constructor(doctorRepo: Repository<Doctor>, appointmentRepo: Repository<Appointment>);
    onApplicationBootstrap(): Promise<void>;
    private seedDoctorsAndAppointments;
}
