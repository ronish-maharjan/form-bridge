import { Router } from "express";
import { guestGuard } from "../../../../../shared/middlewares/guest-guard.middleware.js";
import { ValidationGuard } from "../../../../../shared/middlewares/validation-guard.middleware.js";
import { signupController,logoutController,loginController, refreshTokenController } from "../../../container.js";
import { SignupSchema } from "../schemas/signup.schema.js";
import { LoginSchema } from "../schemas/login.schema.js";
import { authenticateGuard } from "../../../../../shared/middlewares/authenticate-guard.middleware.js";

const router = Router();

router.post("/signup",guestGuard,ValidationGuard.validate(SignupSchema),signupController.handle);
router.post("/login",guestGuard,ValidationGuard.validate(LoginSchema),loginController.handle);
router.post("/logout",authenticateGuard,logoutController.handle);
router.post("/refresh",refreshTokenController.handle);

export {router};
