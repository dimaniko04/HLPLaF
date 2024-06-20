import { NextFunction, Request, Response } from "express";
import { RequestAssertions } from "../utils/assertions/requestAssertions";
import { PaginatedRequest } from "../types/customRequestTypes";
import { favoriteService, productService } from "../services";

class FavoriteController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      RequestAssertions.assertIsRequestWithUser(req);
      const { id } = req.user;
      const { page = 1, limit = 10 } = (req as unknown as PaginatedRequest)
        .query;
      const favorites = await productService.getUserFavorites(id, page, limit);
      res.status(200).json(favorites);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      RequestAssertions.assertIsRequestWithUser(req);
      const { id: userId } = req.user;
      const productId = Number(req.params.productId);

      const created = await favoriteService.addToFavorite(userId, productId);
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      RequestAssertions.assertIsRequestWithUser(req);
      const { id: userId } = req.user;
      const productId = Number(req.params.productId);

      const deleted = await favoriteService.removeFromFavorite(
        userId,
        productId
      );
      res.status(200).json(deleted);
    } catch (err) {
      next(err);
    }
  }
}

export const favoriteController = new FavoriteController();
