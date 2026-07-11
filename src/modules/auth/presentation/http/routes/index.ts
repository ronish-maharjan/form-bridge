import { Router } from "express";
import { router } from "./auth.routes.js";
import { rateLimiter } from "../../../../../shared/middlewares/rate-limiter.middleware.js";

const authRouter = Router();

authRouter.use("/auth",rateLimiter({bucketSize:10,fillRate:0.0001,policy:"auth_route"}),router);

export {authRouter};
