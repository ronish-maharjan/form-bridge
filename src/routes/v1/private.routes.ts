import { Router } from "express";
import { authRouter } from "../../modules/auth/presentation/http/routes/index.js";
import { userRouter } from "../../modules/user/presentation/http/routes/index.js";
import { apisRouter } from "../../modules/apis/presentation/http/routes/index.js";

const privateRouter = Router();

privateRouter.use(authRouter);
privateRouter.use(userRouter);
privateRouter.use(apisRouter);


export {privateRouter};
