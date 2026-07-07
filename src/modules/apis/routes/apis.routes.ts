import { Router } from "express";
import { getApisController } from "../controllers/get-api-keys.controller.js";
import { createApiKeyController } from "../controllers/create-api-key.controller.js";
import { ValidationGuard } from "../../../shared/middlewares/validation-guard.middleware.js";
import { CreateApiKeySchema } from "../usecases/create-api-key.usecase.js";
import { deleteApiKeyController } from "../controllers/delete-api-key.controller.js";

const router = Router();

router.get("/",getApisController.handle);
router.post("/",ValidationGuard.validate(CreateApiKeySchema),createApiKeyController.handle);
router.delete("/:id",deleteApiKeyController.handle);

export {router};
