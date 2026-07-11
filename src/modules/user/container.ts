import { ChangeEmailUsecase } from "./application/usecases/change-email.usecase.js";
import { GetUserUsecase } from "./application/usecases/get-user.usecase.js";
import { UserPostgresRepository } from "./infrastructure/db/user-postgres.repository.js";
import { GetUserController } from "./presentation/http/controllers/get-user.controller.js";
import { ChangeEmailController } from "./presentation/http/controllers/change-email.controller.js";
import { ChangeInboxMailUsecase } from "./application/usecases/change-inbox-mail.usecase.js";
import { ChangeInboxMailController } from "./presentation/http/controllers/change-inbox-mail.controller.js";
import { ChangePasswordUsecase } from "./application/usecases/change-password.usecase.js";
import { ChangePasswordController } from "./presentation/http/controllers/change-password.controller.js";

// repositories
const userRepository = new UserPostgresRepository()


// usecases
const getUserUsecase = new GetUserUsecase(userRepository);
const changeEmailUsecase = new ChangeEmailUsecase(userRepository);
const changeInboxMailUsecase = new ChangeInboxMailUsecase(userRepository);
const changePasswordUsecase = new ChangePasswordUsecase(userRepository);

// controllers
const getUserController = new GetUserController(getUserUsecase);
const changeEmailController = new ChangeEmailController(changeEmailUsecase);
const changeInboxMailController = new ChangeInboxMailController(changeInboxMailUsecase);
const changePasswordController = new ChangePasswordController(changePasswordUsecase);

export {getUserController,changeEmailController,changeInboxMailController,changePasswordController};
