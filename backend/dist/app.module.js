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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const user_entity_1 = require("./users/user.entity");
const appointment_module_1 = require("./appointments/appointment.module");
const appointment_entity_1 = require("./appointments/appointment.entity");
const doctor_entity_1 = require("./doctors/doctor.entity");
const doctor_module_1 = require("./doctors/doctor.module");
const typeorm_2 = require("@nestjs/typeorm");
const seed_service_1 = require("./seed/seed.service");
let AppModule = class AppModule {
    constructor() {
        console.log('Database connection successful!');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT || '3306', 10),
                username: process.env.DB_USERNAME || 'root',
                password: process.env.DB_PASSWORD || '',
                database: process.env.DB_DATABASE || 'clinic',
                entities: [user_entity_1.User, appointment_entity_1.Appointment, doctor_entity_1.Doctor],
                synchronize: true,
            }),
            typeorm_2.TypeOrmModule.forFeature([doctor_entity_1.Doctor, appointment_entity_1.Appointment, user_entity_1.User]),
            auth_module_1.AuthModule,
            appointment_module_1.AppointmentModule,
            doctor_module_1.DoctorModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, seed_service_1.SeedService],
    }),
    __metadata("design:paramtypes", [])
], AppModule);
//# sourceMappingURL=app.module.js.map