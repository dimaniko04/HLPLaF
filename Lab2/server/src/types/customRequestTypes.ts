import { Request } from "express";
import { UserDto } from "../dto/userDto";

export interface RequestWithUser extends Request {
  user: UserDto;
}

export interface ICreateCategory {
  name: string;
}

export interface ICreateProductInfo {
  title: string;
  description: string;
}

export interface ICreateProduct {
  name: string;
  price: number;
  category: number;
  productInfo: ICreateProductInfo[];
}

export interface ICreateOrder {
  userId: number;
  orderDetails: {
    productId: number;
    quantity: number;
  }[];
}

export type CreateCategoryRequest = Request<{}, {}, ICreateCategory>;
export type CreateProductRequest = Request<{}, {}, ICreateProduct>;
export type UpdateProductRequest = Request<{ id: string }, {}, ICreateProduct>;
export type CreateOrderRequest = Request<{}, {}, Omit<ICreateOrder, "userId">>;
