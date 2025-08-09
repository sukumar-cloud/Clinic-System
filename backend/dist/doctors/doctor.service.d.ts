import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
export declare class DoctorService {
    private readonly doctorRepository;
    constructor(doctorRepository: Repository<Doctor>);
    findAll(): Promise<Doctor[]>;
    findOne(id: number): Promise<Doctor>;
    create(doctor: Partial<Doctor>): Promise<Doctor>;
    update(id: number, updateData: Partial<Doctor>): Promise<Doctor>;
    remove(id: number): Promise<void>;
}
