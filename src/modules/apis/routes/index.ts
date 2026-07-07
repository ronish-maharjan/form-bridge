import { Router } from "express";
import { router } from "./apis.routes.js";
import { authenticateGuard } from "../../../shared/middlewares/authenticate-guard.middleware.js";

const apisRouter = Router();

apisRouter.use("/apis",authenticateGuard,router);

export {apisRouter};
