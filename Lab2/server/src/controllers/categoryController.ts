import { NextFunction, Request, Response } from "express";

import { categoryService } from "../services";
import { CreateCategoryRequest } from "../types/customRequestTypes";
import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/apiError";

class CategoryController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await categoryService.getAll();
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const category = await categoryService.getOne(id);
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }

  async create(req: CreateCategoryRequest, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation failed", errors.array()));
      }
      const categoryToCreate = req.body;
      const category = await categoryService.create(categoryToCreate);
      res.status(201).json(category);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const deleted = await categoryService.delete(id);
      res.status(200).json(deleted);
    } catch (err) {
      next(err);
    }
  }
}

export const categoryController = new CategoryController();
