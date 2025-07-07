import { FilmDto, ScheduleDTO } from './dto/films.dto';
import Film, { ISchedule, IFilm } from './film.model';

// Преобразование DTO фильма в сущность Film
export function filmDTOToFilmEntity(filmDTO: FilmDto): IFilm {
  return new Film({
    id: filmDTO.id,
    rating: filmDTO.rating,
    director: filmDTO.director,
    tags: filmDTO.tags,
    image: filmDTO.image,
    cover: filmDTO.cover,
    title: filmDTO.title,
    about: filmDTO.about,
    description: filmDTO.description,
    schedule: filmDTO.schedule?.map(scheduleDTOToScheduleEntity) || [],
  });
}

// Преобразование сущности Film в DTO фильма
export function filmEntityToFilmDTO(film: IFilm): FilmDto {
  return {
    id: film.id,
    rating: film.rating,
    director: film.director,
    tags: film.tags,
    image: film.image,
    cover: film.cover,
    title: film.title,
    about: film.about,
    description: film.description,
    schedule: film.schedule?.map(scheduleEntityToScheduleDTO) || [],
  };
}

// Преобразование DTO расписания в сущность ISchedule
export function scheduleDTOToScheduleEntity(
  scheduleDTO: ScheduleDTO,
): ISchedule {
  return {
    id: scheduleDTO.id,
    daytime: scheduleDTO.daytime,
    hall: scheduleDTO.hall,
    rows: scheduleDTO.rows,
    seats: scheduleDTO.seats,
    price: scheduleDTO.price,
    taken: scheduleDTO.taken,
  };
}

// Преобразование сущности ISchedule в DTO расписания
export function scheduleEntityToScheduleDTO(schedule: ISchedule): ScheduleDTO {
  return {
    id: schedule.id,
    daytime: schedule.daytime,
    hall: schedule.hall,
    rows: schedule.rows,
    seats: schedule.seats,
    price: schedule.price,
    taken: schedule.taken,
  };
}

export default {
  filmDTOToFilmEntity,
  filmEntityToFilmDTO,
  scheduleDTOToScheduleEntity,
  scheduleEntityToScheduleDTO,
};
