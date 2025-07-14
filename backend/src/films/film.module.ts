import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmSchema } from './film.model';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { FilmsRepository } from '../repository/films.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Film', schema: FilmSchema }])],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsRepository],
  exports: [FilmsService, MongooseModule],
})
export class FilmModule {}
