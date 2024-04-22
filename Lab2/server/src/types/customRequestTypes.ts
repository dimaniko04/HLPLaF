import { Request } from "express";

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

export type CreateCategoryRequest = Request<{}, {}, ICreateCategory>;
export type CreateProductRequest = Request<{}, {}, ICreateProduct>;
export type UpdateProductRequest = Request<{ id: number }, {}, ICreateProduct>;
