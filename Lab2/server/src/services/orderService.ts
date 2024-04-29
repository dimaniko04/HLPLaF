import { Repository } from "typeorm";
import { shopDataSource } from "../db";
import { Order, OrderStatus } from "../entities/order";
import { OrderDto } from "../dto/orderDto";
import { ICreateOrder } from "./../types/customRequestTypes";
import { productService } from "./productService";
import { ApiError } from "../exceptions/apiError";

class OrderService {
  readonly orderRepo: Repository<Order>;

  constructor() {
    this.orderRepo = shopDataSource.getRepository(Order);
  }

  async getForUser(userId: number) {
    const userOrders = await this.orderRepo.find({
      relations: {
        orderDetails: {
          product: {
            productInfo: true,
          },
        },
      },
      where: {
        user: {
          id: userId,
        },
      },
    });
    const userOrderDtos = userOrders.map((o) => new OrderDto(o));

    return userOrderDtos;
  }

  async create(createOrder: ICreateOrder) {
    const productIds = createOrder.orderDetails.map((od) => od.productId);
    await productService.getByIds(productIds);

    const newOrder = this.orderRepo.create(createOrder);

    return this.orderRepo.save(newOrder);
  }

  async updateStatus(id: number, status: OrderStatus) {
    const order = await this.orderRepo.findOne({ where: { id } });

    if (!order) {
      throw ApiError.BadRequest(`No order with id ${id}`);
    }
    order.status = status;

    return this.orderRepo.save(order);
  }
}

export const orderService = new OrderService();
