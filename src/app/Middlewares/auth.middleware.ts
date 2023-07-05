import { NextFunction, Request, Response } from "express";
import { CustomError, HttpErrorCode } from "../Exceptions/CustomError";
import { TokenPayload, validateToken } from "../Shared/Authenticator";

export interface CustomRequest extends Request {
  user: TokenPayload;
}

export default async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let token = req.headers.authorization;

    if (!token)
      throw new CustomError("No Token found", HttpErrorCode.UNAUTHORIZED);

    // The token has to start with "Bearer "
    if (token.slice(0, 7) !== "Bearer ")
      throw new CustomError("Token is invalid", 401);

    // we delete bearer part before checking
    token = token.slice(7);

    const user = await validateToken(token);
    (req as CustomRequest).user = user;

    next();
  } catch (err) {
    next(err);
  }
}
