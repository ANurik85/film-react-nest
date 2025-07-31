import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../typeorm/entities/film.entity';
import { Schedule } from '../typeorm/entities/schedule.entity';
import { TypeOrmFilmsRepository } from './typeorm.films.repository';

jest.setTimeout(30000);

describe('FilmsRepository', () => {
  let provider: TypeOrmFilmsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'prac',
          password: 'my_prac_pass',
          database: 'prac',
          entities: [Film, Schedule],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Film, Schedule]),
      ],
      providers: [TypeOrmFilmsRepository],
    }).compile();

    provider = module.get<TypeOrmFilmsRepository>(TypeOrmFilmsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
