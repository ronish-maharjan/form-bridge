import { Router } from "express";
import { getApiKeysController } from "../../../container.js";
import { createApiKeyController } from "../../../container.js";
import { deleteApiKeyController } from "../../../container.js";
import { ValidationGuard } from "../../../../../shared/middlewares/validation-guard.middleware.js";
import { CreateApiKeySchema } from "../schemas/create-api-key.schema.js";
import { requireInboxMail } from "../middlewares/require-inbox-mail.middleware.js";

const router = Router();

router.get("/",getApiKeysController.handle);
router.post("/",requireInboxMail,ValidationGuard.validate(CreateApiKeySchema),createApiKeyController.handle);
router.delete("/:id",deleteApiKeyController.handle);

export {router};
