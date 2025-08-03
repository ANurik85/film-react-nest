import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { ScheduleDTO } from './dto/films.dto';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        FilmsService,
        {
          provide: 'FilmsRepository',
          useValue: {
            // Mock repository methods used by FilmsService
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({
              id: 'some-id',
              rating: 0,
              director: '',
              tags: [],
              image: '',
              cover: '',
              title: '',
              about: '',
              description: '',
              schedule: [],
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should return all films', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([]);
    const result = await controller.getAllFilms();
    expect(result).toEqual({ total: 0, items: [] });
  });

  it('should return film schedule by id', async () => {
    const id = 'some-id';
    const schedule: ScheduleDTO[] = [
      {
        id: 'some-id',
        daytime: 'some-daytime',
        hall: 1,
        rows: 10,
        seats: 20,
        price: 100,
        taken: [],
      },
      {
        id: 'some-id-2',
        daytime: 'some-daytime-2',
        hall: 2,
        rows: 15,
        seats: 30,
        price: 150,
        taken: [],
      },
    ];

    jest.spyOn(service, 'findScheduleById').mockResolvedValue({
      id: 'some-id',
      rating: 0,
      director: '',
      tags: [],
      image: '',
      cover: '',
      title: '',
      about: '',
      description: '',
      schedule: schedule,
    });

    const result = await controller.getFilmSchedule(id);
    expect(result).toEqual({ total: 2, items: schedule });
  });
});
