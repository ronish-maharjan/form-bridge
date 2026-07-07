import { Router } from "express";
import { router } from "./mail.routes.js";

const mailRouter = Router();

mailRouter.use("/mail",router);

export {mailRouter};
