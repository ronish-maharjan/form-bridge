import { Router } from "express";
import { mailGuard } from "../middlewares/mail-guard.middleware.js";
import { sendMailController } from "../../../container.js";

const router = Router();

router.post("/",mailGuard,sendMailController.handle);

export {router}
