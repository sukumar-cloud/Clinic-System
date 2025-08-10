import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const origins = (process.env.CORS_ORIGINS?.split(',').map(s => s.trim()).filter(Boolean)) || ['http://localhost:3001'];
  app.enableCors({
    origin: origins,
    credentials: true,
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
