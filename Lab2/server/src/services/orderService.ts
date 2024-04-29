import { Repository } from "typeorm";
import { shopDataSource } from "../db";
import { Order } from "../entities/order";
import { OrderDto } from "../dto/orderDto";
import { ICreateOrder } from "./../types/customRequestTypes";
import { productService } from "./productService";

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
}

export const orderService = new OrderService();
