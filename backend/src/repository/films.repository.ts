import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFilm } from '../films/film.model';
import { FilmDto } from '../films/dto/films.dto';
import { filmEntityToFilmDTO } from '../films/film.converter';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel('Film') private readonly filmModel: Model<IFilm>) {}

  async findAll(): Promise<FilmDto[]> {
    const films = await this.filmModel.find().lean();
    return films.map(filmEntityToFilmDTO);
  }
  async findById(id: string): Promise<FilmDto | null> {
    const film = await this.filmModel.findOne({ id });
    return film ? filmEntityToFilmDTO(film) : null;
  }
}
