import { Request, Response, NextFunction } from "express";
import { ApiError } from "../exceptions/apiError";
import { tokenService } from "../services/tokenService";
import { RequestWithUser } from "../types/customRequestTypes";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    (req as RequestWithUser).user = userData;
    next();
  } catch (err) {
    return next(ApiError.UnauthorizedError());
  }
};
