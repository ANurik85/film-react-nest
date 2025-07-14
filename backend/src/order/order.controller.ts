import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderResultDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() order: CreateOrderDto): Promise<OrderResultDto[]> {
    return this.orderService.createOrder(order);
  }
}
