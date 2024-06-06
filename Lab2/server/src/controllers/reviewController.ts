import { NextFunction, Request, Response } from "express";
import { RequestAssertions } from "../utils/assertions/requestAssertions";
import {
  CreateReviewRequest,
  GetReviewsRequest,
  UpdateReviewRequest,
} from "../types/customRequestTypes";
import { ApiError } from "../exceptions/apiError";
import { validationResult } from "express-validator";
import { reviewService } from "../services";

class ReviewController {
  async get(req: GetReviewsRequest, res: Response, next: NextFunction) {
    try {
      const productId = Number(req.params.productId);
      const { page = 1, limit = 20 } = req.query;
      const reviews = await reviewService.getAll(productId, page, limit);
      res.status(200).json(reviews);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      RequestAssertions.assertIsRequestWithUser(req);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation failed", errors.array()));
      }
      const { id: userId } = req.user;
      const reviewReq = req as unknown as CreateReviewRequest;
      const productId = Number(reviewReq.params.productId);
      const { text } = reviewReq.body;

      const review = await reviewService.create(userId, productId, text);
      res.status(201).json(review);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const deleted = await reviewService.delete(id);
      res.status(200).json(deleted);
    } catch (err) {
      next(err);
    }
  }

  async update(req: UpdateReviewRequest, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation failed", errors.array()));
      }
      const id = Number(req.params.id);
      const { text } = req.body;

      const review = await reviewService.update(id, text);
      res.status(200).json(review);
    } catch (err) {
      next(err);
    }
  }
}

export const reviewController = new ReviewController();
