import { Router } from "express";
import { router } from "./auth.routes.js";

const authRouter = Router();

authRouter.use("/auth",router);

export {authRouter};
