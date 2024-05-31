import { NextFunction, Request, Response } from "express";
import { productService } from "../services";
import {
  CreateProductRequest,
  PaginatedRequest,
  UpdateProductRequest,
} from "../types/customRequestTypes";
import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/apiError";
import { FileHelper } from "../utils/FileHelper";

class ProductController {
  async getAll(req: PaginatedRequest, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const products = await productService.getAll(page, limit);
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
        if (req.file) {
          await FileHelper.removeFile(req.file?.filename);
        }
        return next(ApiError.BadRequest("Validation failed", errors.array()));
      }
      if (!req.file) {
        return next(ApiError.BadRequest("Product image is required!"));
      }
      const productToCreate = req.body;
      const productImage = req.file.filename;

      const product = await productService.create({
        ...productToCreate,
        img: productImage,
      });
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
      const id = Number(req.params.id);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        if (req.file) {
          await FileHelper.removeFile(req.file?.filename);
        }
        return next(ApiError.BadRequest("Validation failed", errors.array()));
      }
      const updateProduct = req.body;
      const productImage = req.file?.filename;

      const product = await productService.update(id, {
        ...updateProduct,
        img: productImage,
      });
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
}

export const productController = new ProductController();
