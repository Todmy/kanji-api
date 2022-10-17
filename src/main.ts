import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'aws-sdk';

const SERVER_PORT = parseInt(process.env.SERVER_PORT, 10) || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: process.env.NODE_ENV === 'development' });
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRETE_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  await app.listen(SERVER_PORT);
}
bootstrap();
