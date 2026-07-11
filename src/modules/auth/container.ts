import { LoginUsecase } from "./application/usecases/login.usecase.js";
import { SignupUsecase } from "./application/usecases/sign-up.usecase.js";
import { LoginController } from "./presentation/http/controllers/login.controller.js";
import { LogoutController } from "./presentation/http/controllers/logout.controller.js";
import { SignupController } from "./presentation/http/controllers/signup.controller.js";
import { AuthPostgressRepository } from "./infrastructure/db/auth-postgress.repository.js";
import { RefreshTokenUsecase } from "./application/usecases/refresh-token.usecase.js";
import { RefreshTokenController } from "./presentation/http/controllers/refresh-token.controller.js";

// Repositories
const authRepository = new AuthPostgressRepository();

//Usecases
const signupUsecase = new SignupUsecase(authRepository);
const loginUsecase = new LoginUsecase(authRepository);
const refreshTokenUsecase = new RefreshTokenUsecase();


//Controllers
const signupController = new SignupController(signupUsecase);
const loginController = new LoginController(loginUsecase);
const logoutController = new LogoutController()
const refreshTokenController = new RefreshTokenController(refreshTokenUsecase);

export {signupController,loginController,logoutController,refreshTokenController};
