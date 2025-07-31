import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { FilmModule } from '../films/film.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../typeorm/entities/film.entity';
import { Schedule } from '../typeorm/entities/schedule.entity';

jest.setTimeout(30000);

describe('OrderService', () => {
  let service: OrderService;

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
        FilmModule,
      ],
      providers: [OrderService],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
