import { Order } from "../entities/order";
import { OrderDetails } from "../entities/orderDetails";
import { Product } from "../entities/product";

export class OrderDto {
  id: number;
  createdAt: Date;
  orderDetails: OrderDetails[];

  constructor(model: Order) {
    this.id = model.id;
    this.createdAt = model.createdAt;
    this.orderDetails = model.orderDetails;
  }
}
