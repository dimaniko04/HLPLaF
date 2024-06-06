import { Request } from "express";
import { UserDto } from "../dto/userDto";
import { OrderStatus } from "../entities/order";

export interface RequestWithUser extends Request {
  user: UserDto;
}

export interface ICreateCategory {
  name: string;
}

export interface ICreateProduct {
  name: string;
  price: number;
  category: number;
}

export interface ICreateOrder {
  userId: number;
  orderDetails: {
    productId: number;
    quantity: number;
  }[];
}

export interface IPaginationParams {
  page: number;
  limit: number;
}

export type PaginatedRequest = Request<{}, {}, {}, IPaginationParams>;

export type CreateCategoryRequest = Request<{}, {}, ICreateCategory>;
export type CreateProductRequest = Request<{}, {}, ICreateProduct>;
export type UpdateProductRequest = Request<{ id: string }, {}, ICreateProduct>;
export type CreateOrderRequest = Request<{}, {}, Omit<ICreateOrder, "userId">>;
export type UpdateOrderStatusRequest = Request<
  { id: number },
  {},
  { status: OrderStatus }
>;
