import { Router } from "express";
import { guestGuard } from "../../../shared/middlewares/guest-guard.middleware.js";
import { UserSignupSchema } from "../middlewares/signup.middleware.js";
import { signupController } from "../controllers/signup.controller.js";
import { loginController } from "../controllers/login.controller.js";
import { UserLoginSchema } from "../middlewares/login.middleware.js";
import { authenticateGuard } from "../../../shared/middlewares/authenticate-guard.middleware.js";
import { logoutController } from "../controllers/logout.controller.js";
import { ValidationGuard } from "../../../shared/middlewares/validation-guard.middleware.js";

const router = Router();

router.post("/signup",guestGuard,ValidationGuard.validate(UserSignupSchema),signupController.handle);
router.post("/login",guestGuard,ValidationGuard.validate(UserLoginSchema),loginController.handle);
router.post("/logout",authenticateGuard,logoutController.handle);

export {router};
