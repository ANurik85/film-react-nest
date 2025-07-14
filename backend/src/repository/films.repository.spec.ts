import { Test, TestingModule } from '@nestjs/testing';
import { FilmsRepository } from './films.repository';
import { FilmModule } from '../films/film.module';
import { MongooseModule } from '@nestjs/mongoose';

describe('FilmsRepository', () => {
  let provider: FilmsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/afisha'),
        FilmModule,
      ],
      providers: [FilmsRepository],
    }).compile();

    provider = module.get<FilmsRepository>(FilmsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
