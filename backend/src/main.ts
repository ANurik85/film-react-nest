import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.getHttpAdapter().getInstance().disable('etag');
  app.setGlobalPrefix('api/afisha');
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
