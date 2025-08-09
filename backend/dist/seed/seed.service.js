"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SeedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const doctor_entity_1 = require("../doctors/doctor.entity");
const appointment_entity_1 = require("../appointments/appointment.entity");
let SeedService = SeedService_1 = class SeedService {
    constructor(doctorRepo, appointmentRepo) {
        this.doctorRepo = doctorRepo;
        this.appointmentRepo = appointmentRepo;
        this.logger = new common_1.Logger(SeedService_1.name);
    }
    async onApplicationBootstrap() {
        await this.seedDoctorsAndAppointments();
    }
    async seedDoctorsAndAppointments() {
        const doctorCount = await this.doctorRepo.count();
        if (doctorCount === 0) {
            const drAlice = this.doctorRepo.create({
                name: 'Dr. Alice Smith',
                specialization: 'Cardiology',
                gender: 'Female',
                location: 'Block A',
                available: true,
            });
            const drBob = this.doctorRepo.create({
                name: 'Dr. Bob Johnson',
                specialization: 'Dermatology',
                gender: 'Male',
                location: 'Block B',
                available: true,
            });
            const savedDoctors = await this.doctorRepo.save([drAlice, drBob]);
            this.logger.log(`Seeded doctors: ${savedDoctors.map(d => d.name).join(', ')}`);
        }
        const apptCount = await this.appointmentRepo.count();
        if (apptCount === 0) {
            const doctors = await this.doctorRepo.find();
            if (doctors.length === 0)
                return;
            const now = new Date();
            const in30 = new Date(now.getTime() + 30 * 60 * 1000);
            const appt1 = this.appointmentRepo.create({
                patientName: 'John Doe',
                doctor: doctors[0],
                time: now,
                status: 'booked',
            });
            const appt2 = this.appointmentRepo.create({
                patientName: 'Jane Roe',
                doctor: doctors[Math.min(1, doctors.length - 1)],
                time: in30,
                status: 'waiting',
            });
            await this.appointmentRepo.save([appt1, appt2]);
            this.logger.log('Seeded sample appointments.');
        }
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = SeedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(doctor_entity_1.Doctor)),
    __param(1, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SeedService);
//# sourceMappingURL=seed.service.js.map