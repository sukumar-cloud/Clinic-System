import { OnApplicationBootstrap } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Doctor } from '../doctors/doctor.entity';
import { Appointment } from '../appointments/appointment.entity';
import { User } from '../users/user.entity';
export declare class SeedService implements OnApplicationBootstrap {
    private readonly doctorRepo;
    private readonly appointmentRepo;
    private readonly userRepo;
    private readonly logger;
    constructor(doctorRepo: Repository<Doctor>, appointmentRepo: Repository<Appointment>, userRepo: Repository<User>);
    onApplicationBootstrap(): Promise<void>;
    private seedUsers;
    private seedDoctorsAndAppointments;
}
