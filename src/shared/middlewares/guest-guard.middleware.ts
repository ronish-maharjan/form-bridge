import { NextFunction, Request, Response } from "express";
import { JwtToken } from "../utils/jwt-token.js";
import { ConflictError } from "../errors/conflict.error.js";

const guestGuard = ( req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies["__secure-access-token"];
  const refreshToken = req.cookies["__secure-refresh-token"];

  if (!accessToken) {
    return next();
  }

  try {
    JwtToken.verifyToken(accessToken);
    JwtToken.verifyToken(refreshToken);

    return next(
      new ConflictError({
        message: "Already authenticated.",
      })
    );
  } catch {
    // Token is invalid or expired, treat user as a guest.
    return next();
  }
};

export {guestGuard}
