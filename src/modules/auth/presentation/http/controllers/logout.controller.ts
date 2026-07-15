import { NextFunction, Request, Response } from "express";
import { logger } from "../../../../../shared/logger/logger.js";

class LogoutController {
    public handle = async (req: Request, res: Response, next: NextFunction) => {
        logger.debug({data:req.cookies["__Secure-access-token"]})
        res.clearCookie("__Secure-access-token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
        });

        res.clearCookie("__Secure-refresh-token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
        });
        return res.sendStatus(204);
    };
}

export { LogoutController };
