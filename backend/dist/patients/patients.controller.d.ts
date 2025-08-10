import { PatientsService } from './patients.service';
import { Patient } from './patient.entity';
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    findAll(): Promise<Patient[]>;
    findOne(id: string): Promise<Patient>;
    create(data: Partial<Patient>): Promise<Patient>;
    update(id: string, data: Partial<Patient>): Promise<Patient>;
    remove(id: string): Promise<void>;
}
