import { Router } from "express";
import { healthRouter } from "../../modules/health/routes/index.js";
import { mailRouter } from "../../modules/mail/presentation/http/routes/index.js";

const publicRouter = Router();


publicRouter.use(healthRouter);
publicRouter.use(mailRouter);

export {publicRouter};
