import { Router } from "express";
import { router } from "./user.routes.js";
import { authenticateGuard } from "../../../../../shared/middlewares/authenticate-guard.middleware.js";
import { rateLimiter } from "../../../../../shared/middlewares/rate-limiter.middleware.js";

const userRouter = Router();

userRouter.use("/user",rateLimiter({bucketSize:60,fillRate:0.0002,policy:"user_route"}),authenticateGuard,router);

export {userRouter};
