import { NextFunction, Request, Response } from "express";

class LogoutController {
  public handle = async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("__access-token", {
      path: "/",
    });

    return res.sendStatus(204);
  };
}

const logoutController = new LogoutController();
export { logoutController };
