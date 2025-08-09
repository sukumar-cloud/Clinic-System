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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const appointment_entity_1 = require("./appointment.entity");
const doctor_entity_1 = require("../doctors/doctor.entity");
let AppointmentService = class AppointmentService {
    constructor(appointmentRepository, doctorRepository) {
        this.appointmentRepository = appointmentRepository;
        this.doctorRepository = doctorRepository;
    }
    findAll() {
        return this.appointmentRepository.find();
    }
    async findOne(id) {
        const appointment = await this.appointmentRepository.findOne({ where: { id } });
        if (!appointment)
            throw new common_1.NotFoundException('Appointment not found');
        return appointment;
    }
    async create(data) {
        const doctor = await this.doctorRepository.findOne({ where: { id: data.doctorId } });
        if (!doctor)
            throw new common_1.NotFoundException('Doctor not found');
        const appointment = this.appointmentRepository.create({
            patientName: data.patientName,
            doctor,
            time: data.time,
            status: 'booked',
        });
        return this.appointmentRepository.save(appointment);
    }
    async update(id, updateData) {
        await this.appointmentRepository.update(id, updateData);
        const updated = await this.appointmentRepository.findOne({ where: { id } });
        if (!updated)
            throw new common_1.NotFoundException('Appointment not found');
        return updated;
    }
    async remove(id) {
        await this.appointmentRepository.delete(id);
    }
};
exports.AppointmentService = AppointmentService;
exports.AppointmentService = AppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __param(1, (0, typeorm_1.InjectRepository)(doctor_entity_1.Doctor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AppointmentService);
//# sourceMappingURL=appointment.service.js.map