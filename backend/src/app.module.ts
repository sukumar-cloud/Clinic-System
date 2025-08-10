import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { AppointmentModule } from './appointments/appointment.module';
import { Appointment } from './appointments/appointment.entity';
import { Doctor } from './doctors/doctor.entity';
import { DoctorModule } from './doctors/doctor.module';
import { TypeOrmModule as FeatureTypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed/seed.service';
import { Patient } from './patients/patient.entity';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: (process.env.DB_HOST as string) || 'localhost',
      port: parseInt((process.env.DB_PORT as string) || '3306', 10),
      username: (process.env.DB_USERNAME as string) || 'root',
      password: (process.env.DB_PASSWORD as string) || '',
      database: (process.env.DB_DATABASE as string) || 'clinic',
      entities: [User, Appointment, Doctor, Patient],
      synchronize: true,
    }),
    FeatureTypeOrmModule.forFeature([Doctor, Appointment, User, Patient]),
    AuthModule,
    AppointmentModule,
    DoctorModule,
    PatientsModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {
  constructor() {
    console.log('Database connection successful!');
  }
}
