import { DoctorService } from './doctor.service';
import { Doctor } from './doctor.entity';
export declare class DoctorController {
    private readonly doctorService;
    constructor(doctorService: DoctorService);
    findAll(): Promise<Doctor[]>;
    findOne(id: string): Promise<Doctor>;
    create(doctor: Partial<Doctor>): Promise<Doctor>;
    update(id: string, doctor: Partial<Doctor>): Promise<Doctor>;
    remove(id: string): Promise<void>;
}
