import { Request } from "express";
import { AssertionError } from "assert";
import { RequestWithUser } from "../../types/customRequestTypes";

export class RequestAssertions {
  static assertIsRequestWithUser(req: Request): asserts req is RequestWithUser {
    if (!("user" in req)) {
      throw new AssertionError({
        message: `Invalid request object, missing 'user'`,
      });
    }
  }
}
