import { NextFunction, Request, Response } from "express";

class LogoutController {
  public handle = async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("__secure-access-token", {
      path: "/",
    });
    res.clearCookie("__secure-refresh-token", {
      path: "/",
    });
    return res.sendStatus(204);
  };
}

export { LogoutController };
