import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const domain = 'http://localhost';
const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Logger.overrideLogger(['error', 'warn', 'log']);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Dev Quiz API')
    .setDescription('The Dev Quiz API description')
    .setVersion('1.0')
    .addTag('dev-quiz')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const swaggerPath = process.env.SWAGGER_PATH || '/u33dd22asd';
  SwaggerModule.setup(swaggerPath, app, document);

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
