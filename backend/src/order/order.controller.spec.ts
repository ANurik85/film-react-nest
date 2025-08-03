import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        {
          provide: 'FilmRepository',
          useValue: {
            // Mock repository methods used by OrderService
            findOne: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should create order', async () => {
    const order: CreateOrderDto = {
      email: 'test@example.com',
      phone: '79999999999',
      tickets: [
        {
          film: 'some-film-id',
          session: 'some-session-id',
          row: 1,
          seat: 1,
          price: 100,
        },
      ],
    };

    jest.spyOn(service, 'createOrder').mockResolvedValue([
      {
        id: 'some-order-id',
        film: 'some-film-id',
        session: 'some-session-id',
        row: 1,
        seat: 1,
        price: 100,
        daytime: '2023-05-29T10:30:00.001Z',
      },
    ]);

    const result = await controller.createOrder(order);
    expect(result).toEqual([
      {
        id: 'some-order-id',
        film: 'some-film-id',
        session: 'some-session-id',
        row: 1,
        seat: 1,
        price: 100,
        daytime: '2023-05-29T10:30:00.001Z',
      },
    ]);
  });

  it('should throw error if order is invalid', async () => {
    const order: CreateOrderDto = {
      email: 'invalid-email',
      phone: 'invalid-phone',
      tickets: [],
    };

    jest
      .spyOn(service, 'createOrder')
      .mockRejectedValue(new Error('Invalid order'));

    await expect(controller.createOrder(order)).rejects.toThrow(
      'Invalid order',
    );
  });
});
