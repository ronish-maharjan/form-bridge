import { Router } from "express";
import { healthRouter } from "../../modules/health/routes/index.js";
import { authRouter } from "../../modules/auth/routes/index.js";
import { userRouter } from "../../modules/user/routes/index.js";
import { apisRouter } from "../../modules/apis/routes/index.js";
import { mailRouter } from "../../modules/mail/routes/index.js";

const v1Router = Router();

v1Router.use(healthRouter);
v1Router.use(authRouter);
v1Router.use(userRouter);
v1Router.use(apisRouter);
v1Router.use(mailRouter);

export {v1Router};
