import { Router } from "express";
import { healthController } from "../controllers/health.controller.js";

const router  = Router();

router.get("/",healthController.health);
router.get("/ready",healthController.ready);

export {router}
