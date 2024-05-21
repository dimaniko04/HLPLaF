import { IProduct } from "./IProduct";

export interface IOrderDetails {
  id: number;
  quantity: number;
  product: IProduct;
}

export interface IOrder {
  id: number;
  status: string;
  createdAt: Date;
  orderDetails: IOrderDetails[];
}
