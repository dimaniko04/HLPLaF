import { NextFunction, Request, Response } from "express";
import { orderService } from "../services";
import { RequestAssertions } from "../utils/assertions/requestAssertions";
import {
  CreateOrderRequest,
  UpdateOrderStatusRequest,
} from "../types/customRequestTypes";
import { ApiError } from "../exceptions/apiError";
import { validationResult } from "express-validator";
import { OrderDto } from "../dto/orderDto";
import { OrderStatus } from "../entities/order";

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
      const orderDto = new OrderDto(order);
      res.status(201).json(orderDto);
    } catch (err) {
      next(err);
    }
  }

  async cancel(
    req: Request<{ id: number }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      await orderService.updateStatus(id, OrderStatus.CANCELLED);
      res.status(200).json("Order successfully cancelled");
    } catch (err) {
      next(err);
    }
  }

  async updateStatus(
    req: UpdateOrderStatusRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation failed", errors.array()));
      }

      const { id } = req.params;
      const { status } = req.body;
      await orderService.updateStatus(id, status);
      res.status(200).json("Order status changed");
    } catch (err) {
      next(err);
    }
  }
}

export const orderController = new OrderController();
