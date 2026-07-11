import { Router } from "express";
import { ValidationGuard } from "../../../../../shared/middlewares/validation-guard.middleware.js";
import { changeEmailController, changeInboxMailController, changePasswordController, getUserController } from "../../../container.js";
import { ChangeEmailSchema } from "../schemas/change-email.schema.js";
import { ChangeInboxMailSchema } from "../schemas/change-inbox-mail.schema.js";
import { ChangePasswordSchema } from "../schemas/change-password.schema.js";

const router = Router();

router.get("/me",getUserController.handle);
router.patch("/me/email",ValidationGuard.validate(ChangeEmailSchema),changeEmailController.handle);
router.patch("/me/inbox-mail",ValidationGuard.validate(ChangeInboxMailSchema),changeInboxMailController.handle);
router.patch("/me/password",ValidationGuard.validate(ChangePasswordSchema),changePasswordController.handle);

export {router};
