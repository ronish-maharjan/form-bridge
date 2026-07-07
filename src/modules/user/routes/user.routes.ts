import { Router } from "express";
import { getUserController } from "../controllers/get-user.controller.js";
import { patchUserController } from "../controllers/patch-user.controller.js";
import { ValidationGuard } from "../../../shared/middlewares/validation-guard.middleware.js";
import { patchUserSchema } from "../usecases/patch-user.usecase.js";

const router = Router();

router.get("/me",getUserController.handle);
router.patch("/me",ValidationGuard.validate(patchUserSchema),patchUserController.handle);
export {router};
