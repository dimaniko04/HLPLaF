import { NextFunction, Request, Response } from "express";
import { RequestAssertions } from "../utils/assertions/requestAssertions";
import { recommendationService } from "../services/recommendationService";

class RecommendationController {
  async getUserRecommendations(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      RequestAssertions.assertIsRequestWithUser(req);
      const { id } = req.user;
      const recommendations =
        await recommendationService.getUserRecommendations(id);
      res.status(200).json(recommendations);
    } catch (err) {
      next(err);
    }
  }
}

export const recommendationController = new RecommendationController();
