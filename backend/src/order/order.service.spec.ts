import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { FilmModule } from '../films/film.module';
import { MongooseModule } from '@nestjs/mongoose';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/afisha'),
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
