import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'node:path';
import { MongooseModule } from '@nestjs/mongoose';

import { configProvider } from './app.config.provider';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { AppController } from './app.controller';
import { FilmModule } from './films/film.module';

@Module({
  imports: [
    FilmModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    // @todo: Добавьте раздачу статических файлов из public
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        console.log('DATABASE_URL:', config.get<string>('DATABASE_URL'));
        return {
          uri: config.get<string>('DATABASE_URL'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, OrderController],
  providers: [configProvider, OrderService],
})
export class AppModule {}
