import { NextFunction, Request, Response } from "express";
import { productService } from "../services";
import {
  CreateProductRequest,
  UpdateProductRequest,
} from "../types/customRequestTypes";
import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/apiError";

class ProductController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.getAll();
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const product = await productService.getOne(id);
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }

  async create(req: CreateProductRequest, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation failed", errors.array()));
      }
      const productToCreate = req.body;
      const product = await productService.create(productToCreate);
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const deleted = await productService.delete(id);
      res.status(200).json(deleted);
    } catch (err) {
      next(err);
    }
  }

  async update(req: UpdateProductRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation failed", errors.array()));
      }
      const updateProduct = req.body;
      const product = await productService.update(id, updateProduct);
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
}

export const productController = new ProductController();
