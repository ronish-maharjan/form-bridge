import { CreateApiKeyUsecase } from "./application/usecases/create-api-key.usecase.js";
import { DeleteApiKeyUsecase } from "./application/usecases/delete-api-key.usecase.js";
import { GetApiKeysUsecase } from "./application/usecases/get-api-keys.usecase.js";
import { ApiPostgresRepository } from "./infrastructure/db/api-postgres.repository.js";
import { CreateApiKeyController } from "./presentation/http/controllers/create-api-key.controller.js";
import { DeleteApiKeyController } from "./presentation/http/controllers/delete-api-key.controller.js";
import { GetApikeysController } from "./presentation/http/controllers/get-api-keys.controller.js";

//repositories

const apiRepository = new ApiPostgresRepository();

// usecases
const createApiKeyUsecase = new CreateApiKeyUsecase(apiRepository);
const getApiKeysUsecase = new GetApiKeysUsecase(apiRepository);
const deleteApiKeyUsecase = new DeleteApiKeyUsecase(apiRepository);

// Controllers
const createApiKeyController = new CreateApiKeyController(createApiKeyUsecase); 
const getApiKeysController = new GetApikeysController(getApiKeysUsecase);
const deleteApiKeyController = new DeleteApiKeyController(deleteApiKeyUsecase);

export {createApiKeyController,getApiKeysController,deleteApiKeyController};

