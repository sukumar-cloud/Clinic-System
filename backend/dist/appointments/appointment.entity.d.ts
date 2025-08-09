import { Doctor } from '../doctors/doctor.entity';
export declare class Appointment {
    id: number;
    patientName: string;
    doctor: Doctor;
    time: Date;
    status: string;
}
