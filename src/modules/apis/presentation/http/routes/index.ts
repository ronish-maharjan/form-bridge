import { Router } from "express";
import { router } from "./apis.routes.js";
import { authenticateGuard } from "../../../../../shared/middlewares/authenticate-guard.middleware.js";
import { rateLimiter } from "../../../../../shared/middlewares/rate-limiter.middleware.js";

const apisRouter = Router();

apisRouter.use("/apis",rateLimiter({bucketSize:20,fillRate:0.0005,policy:"apis_route"}),authenticateGuard,router);

export {apisRouter};
