import { Router } from "express";
import { mailGuard } from "../middlewares/mail-guard.middleware.js";
import { sendMailController } from "../controllers/mail.controller.js";

const router = Router();

router.post("/",mailGuard,sendMailController.handle);

export {router}
