import { Result, ValidationError } from "express-validator";

export class ApiError extends Error {
  status: number;
  errors: ValidationError[];

  constructor(status: number, message: string, errors: ValidationError[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message: string, errors: ValidationError[] = []) {
    return new ApiError(400, message, errors);
  }

  static ValidationError(errors: Result<ValidationError>) {
    return ApiError.BadRequest("Validation failed", errors.array());
  }

  static UnauthorizedError() {
    return new ApiError(401, "User is not authorized");
  }
}
