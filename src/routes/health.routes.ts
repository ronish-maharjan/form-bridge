import { Router } from "express";
import { healthController } from "../controllers/health.controller.js";


const router = Router()


router.get("/health",healthController.health)
router.get("/health/ready",healthController.ready)

export {router as healthRouter}
