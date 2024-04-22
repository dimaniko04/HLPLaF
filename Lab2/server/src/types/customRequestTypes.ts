import { Request } from "express";

export interface ICreateCategory {
  name: string;
}

export type CreateCategoryRequest = Request<{}, {}, ICreateCategory>;
