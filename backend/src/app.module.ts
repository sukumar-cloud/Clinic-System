import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from 'app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';

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
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
