import { NextFunction, Request, Response } from "express";
import { orderService } from "../services";
import { RequestAssertions } from "../utils/assertions/requestAssertions";
import { CreateOrderRequest } from "../types/customRequestTypes";
import { ApiError } from "../exceptions/apiError";
import { validationResult } from "express-validator";

class OrderController {
  async getForCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      RequestAssertions.assertIsRequestWithUser(req);
      const { id } = req.user;
      const orders = await orderService.getForUser(id);
      res.status(200).json(orders);
    } catch (err) {
      next(err);
    }
  }

  async createForCurrentUser(
    req: CreateOrderRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      RequestAssertions.assertIsRequestWithUser(req);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation failed", errors.array()));
      }
      const { id } = req.user;
      const orderToCreate = req.body;

      const order = await orderService.create({ ...orderToCreate, userId: id });
      res.status(201).json(order);
    } catch (err) {
      next(err);
    }
  }
}

export const orderController = new OrderController();
