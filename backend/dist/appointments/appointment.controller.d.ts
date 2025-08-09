import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.entity';
export declare class AppointmentController {
    private readonly appointmentService;
    constructor(appointmentService: AppointmentService);
    findAll(): Promise<Appointment[]>;
    findOne(id: string): Promise<Appointment>;
    create(body: {
        patientName: string;
        doctorId: number;
        time: Date;
    }): Promise<Appointment>;
    update(id: string, update: Partial<Appointment>): Promise<Appointment>;
    remove(id: string): Promise<void>;
}
