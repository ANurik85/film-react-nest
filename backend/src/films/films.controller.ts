import { Controller, Get, Header, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmDto, ScheduleDTO } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Header('Cache-Control', 'no-cache')
  @Get()
  async getAllFilms(): Promise<{ total: number; items: FilmDto[] }> {
    const items = await this.filmsService.findAll();
    return {
      total: items.length,
      items,
    };
  }

  @Get(':id/schedule')
  async getFilmSchedule(
    @Param('id') id: string,
  ): Promise<{ total: number; items: ScheduleDTO[] }> {
    const film = await this.filmsService.findScheduleById(id);
    const items = film?.schedule || [];
    return {
      total: items.length,
      items,
    };
  }
}
