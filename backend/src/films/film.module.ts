import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../typeorm/entities/film.entity';
import { Schedule } from '../typeorm/entities/schedule.entity';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { TypeOrmFilmsRepository } from '../repository/typeorm.films.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [FilmsController],
  providers: [
    FilmsService,
    {
      provide: 'FilmsRepository',
      useClass: TypeOrmFilmsRepository,
    },
  ],
  exports: [FilmsService, TypeOrmModule],
})
export class FilmModule {}
