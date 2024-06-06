import { Repository } from "typeorm";
import { shopDataSource } from "../db";
import { Order, OrderStatus } from "../entities/order";
import { OrderDto } from "../dto/orderDto";
import { ICreateOrder } from "./../types/customRequestTypes";
import { productService } from "./productService";
import { ApiError } from "../exceptions/apiError";
import { toPaginatedList } from "../utils/toPaginatedList";

class OrderService {
  readonly orderRepo: Repository<Order>;

  constructor() {
    this.orderRepo = shopDataSource.getRepository(Order);
  }

  async getForUser(userId: number, page: number, limit: number) {
    const [userOrders, total] = await this.orderRepo.findAndCount({
      relations: {
        orderDetails: {
          product: true,
        },
      },
      where: {
        user: {
          id: userId,
        },
      },
      order: { createdAt: "DESC" },
      take: limit,
      skip: (page - 1) * limit,
    });
    const userOrderDtos = userOrders.map((o) => new OrderDto(o));

    return toPaginatedList(userOrderDtos, total, page, limit);
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
