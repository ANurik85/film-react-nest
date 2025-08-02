import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { LoggerFactory } from './logger/logger.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.getHttpAdapter().getInstance().disable('etag');
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useLogger(LoggerFactory.create());
  await app.listen(3000);
}
bootstrap();
