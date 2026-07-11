import { Router } from "express";
import { router } from "./mail.routes.js";
import { rateLimiter } from "../../../../../shared/middlewares/rate-limiter.middleware.js";

const mailRouter = Router();

mailRouter.use("/mail",rateLimiter({bucketSize:5,fillRate:0.00001,policy:"mail_route"}),router);

export {mailRouter};
