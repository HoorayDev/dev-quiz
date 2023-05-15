import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Logger } from '@nestjs/common';

// server environment
const domain = 'http://localhost';
const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap().then(() => {
  Logger.log(`Server running on ${domain}:${port}`, 'Bootstrap');
});
