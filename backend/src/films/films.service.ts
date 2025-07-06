import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { FilmDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll(): Promise<FilmDto[]> {
    return this.filmsRepository.findAll();
  }

  async findScheduleById(id: string): Promise<FilmDto | null> {
    return this.filmsRepository.findById(id);
  }
}
