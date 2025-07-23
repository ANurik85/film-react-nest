import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmDto } from '../films/dto/films.dto';
import { Film } from '../typeorm/entities/film.entity';
import { FilmsRepository } from './films.repository';

@Injectable()
export class TypeOrmFilmsRepository implements FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}
  async findAll(): Promise<FilmDto[]> {
    const films = await this.filmRepository.find({
      relations: ['schedule'],
    });

    return films.map((film) => ({
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags.split(','),
      image: film.image,
      cover: film.cover,
      title: film.title,
      about: film.about,
      description: film.description,
      schedule: film.schedule.map((s) => ({
        id: s.id,
        daytime: s.daytime,
        hall: s.hall,
        rows: s.rows,
        seats: s.seats,
        price: s.price,
        taken: s.taken ? s.taken.split(',').filter(Boolean) : [],
      })),
    }));
  }

  async findById(id: string): Promise<FilmDto | null> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });

    if (!film) return null;

    return {
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags.split(','),
      image: film.image,
      cover: film.cover,
      title: film.title,
      about: film.about,
      description: film.description,
      schedule: film.schedule.map((s) => ({
        id: s.id,
        daytime: s.daytime,
        hall: s.hall,
        rows: s.rows,
        seats: s.seats,
        price: s.price,
        taken: s.taken ? s.taken.split(',').filter(Boolean) : [],
      })),
    };
  }
}
