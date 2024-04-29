import { Order, OrderStatus } from "../entities/order";
import { Product } from "../entities/product";

interface OrderDtoDetails {
  id: number;
  quantity: number;
  product: Product;
}

export class OrderDto {
  id: number;
  status: OrderStatus;
  createdAt: Date;
  orderDetails: OrderDtoDetails[];

  constructor(model: Order) {
    this.id = model.id;
    this.status = model.status;
    this.createdAt = model.createdAt;
    this.orderDetails = model.orderDetails.map((od) => ({
      id: od.orderDetailsId,
      quantity: od.quantity,
      product: od.product,
    }));
  }
}
