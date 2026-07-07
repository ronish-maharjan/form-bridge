import { Router } from "express";
import { router } from "./health.routes.js";

const healthRouter = Router();

//Grouping the health related routes
healthRouter.use("/health",router);

export {healthRouter};
