import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true, // allow only dto fields
    forbidNonWhitelisted: true,
    transform: true, //Incoming data ko DTO ke according transform karta hai.
  }),
);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
