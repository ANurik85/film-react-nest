import { FilmDto } from '../films/dto/films.dto';

export interface FilmsRepository {
  findAll(): Promise<FilmDto[]>;
  findById(id: string): Promise<FilmDto | null>;
}
