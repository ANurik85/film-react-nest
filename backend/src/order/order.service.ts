import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFilm } from '../films/film.model';
import { CreateOrderDto, OrderResultDto } from './dto/order.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Film') private readonly filmModel: Model<IFilm>) {}

  async createOrder(order: CreateOrderDto): Promise<OrderResultDto[]> {
    const results: OrderResultDto[] = [];

    for (const ticket of order.tickets) {
      const film = await this.filmModel.findOne({ id: ticket.film });
      if (!film) throw new BadRequestException('Фильм не найден');

      const session = film.schedule.find((s) => s.id === ticket.session);
      if (!session) throw new BadRequestException('Сеанс не найден');

      const seatKey = `${ticket.row}:${ticket.seat}`;
      if (session.taken.includes(seatKey)) {
        throw new BadRequestException(`Место ${seatKey} уже занято`);
      }

      session.taken.push(seatKey);

      results.push({
        id: uuidv4(),
        film: ticket.film,
        session: ticket.session,
        row: ticket.row,
        seat: ticket.seat,
        price: ticket.price,
        daytime: session.daytime,
      });

      // Сохраняем изменения в базе
      await film.save();
    }

    return results;
  }
}
