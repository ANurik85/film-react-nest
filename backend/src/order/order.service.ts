import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../typeorm/entities/film.entity';
import { CreateOrderDto, OrderResultDto } from './dto/order.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}

  async createOrder(order: CreateOrderDto): Promise<OrderResultDto[]> {
    const results: OrderResultDto[] = [];

    for (const ticket of order.tickets) {
      const film = await this.filmRepository.findOne({
        where: { id: ticket.film },
        relations: ['schedule'],
      });

      if (!film) throw new BadRequestException('Фильм не найден');

      const session = film.schedule.find((s) => s.id === ticket.session);
      if (!session) throw new BadRequestException('Сеанс не найден');

      const seatKey = `${ticket.row}:${ticket.seat}`;
      const takenSeats = session.taken
        ? session.taken.split(',').filter(Boolean)
        : [];

      if (takenSeats.includes(seatKey)) {
        throw new BadRequestException(`Место ${seatKey} уже занято`);
      }

      takenSeats.push(seatKey);
      session.taken = takenSeats.join(',');

      await this.filmRepository.save(film);

      results.push({
        id: uuidv4(),
        film: ticket.film,
        session: ticket.session,
        row: ticket.row,
        seat: ticket.seat,
        price: ticket.price,
        daytime: session.daytime,
      });
    }

    return results;
  }
}
