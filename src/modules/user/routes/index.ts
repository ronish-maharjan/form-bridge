import { Router } from "express";
import { router } from "./user.routes.js";
import { authenticateGuard } from "../../../shared/middlewares/authenticate-guard.middleware.js";

const userRouter = Router();

userRouter.use("/user",authenticateGuard,router);

export {userRouter};
