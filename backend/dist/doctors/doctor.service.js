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
exports.DoctorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const doctor_entity_1 = require("./doctor.entity");
let DoctorService = class DoctorService {
    constructor(doctorRepository) {
        this.doctorRepository = doctorRepository;
    }
    findAll() {
        return this.doctorRepository.find();
    }
    async findOne(id) {
        const doctor = await this.doctorRepository.findOneBy({ id });
        if (!doctor)
            throw new common_1.NotFoundException('Doctor not found');
        return doctor;
    }
    async create(doctor) {
        const newDoctor = this.doctorRepository.create(doctor);
        return this.doctorRepository.save(newDoctor);
    }
    async update(id, updateData) {
        await this.doctorRepository.update(id, updateData);
        const updated = await this.doctorRepository.findOneBy({ id });
        if (!updated)
            throw new common_1.NotFoundException('Doctor not found');
        return updated;
    }
    async remove(id) {
        await this.doctorRepository.delete(id);
    }
};
exports.DoctorService = DoctorService;
exports.DoctorService = DoctorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(doctor_entity_1.Doctor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DoctorService);
//# sourceMappingURL=doctor.service.js.map