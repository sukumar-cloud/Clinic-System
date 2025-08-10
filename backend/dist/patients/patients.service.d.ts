import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
export declare class PatientsService {
    private readonly patientRepo;
    constructor(patientRepo: Repository<Patient>);
    findAll(): Promise<Patient[]>;
    findOne(id: number): Promise<Patient>;
    create(data: Partial<Patient>): Promise<Patient>;
    update(id: number, data: Partial<Patient>): Promise<Patient>;
    remove(id: number): Promise<void>;
}
