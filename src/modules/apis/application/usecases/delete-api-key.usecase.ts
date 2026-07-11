import { DatabaseError } from "../../../../shared/errors/database.error.js";
import { ValidationError } from "../../../../shared/errors/validation.error.js";
import { ok, Result } from "../../../../shared/result.js";
import { IdVo } from "../../../shared/value-objects/id.vo.js";
import { ApiRepository } from "../../domain/repositories/api.repository.js";

type DeleteApiKeyUsecaseData ={
    userId:string,
    apiKeyId:string
}

class DeleteApiKeyUsecase {
    readonly #apiRepository:ApiRepository;
    constructor(repository:ApiRepository){
        this.#apiRepository = repository;
    }
    public execute = async(data:DeleteApiKeyUsecaseData):Promise<Result<void,ValidationError|DatabaseError>>=>{
       const userIdVoResult = IdVo.create(data.userId);
       if(!userIdVoResult.ok){
            return userIdVoResult;
       }
       const apiKeyIdVoResult = IdVo.create(data.apiKeyId);
       if(!apiKeyIdVoResult.ok){
            return apiKeyIdVoResult;
       }

       const dbResult = await this.#apiRepository.deleteByIdAndUserId(apiKeyIdVoResult.data,userIdVoResult.data)
       if(!dbResult.ok){
            return dbResult;
       }

       return ok(undefined)
    };
}

export {DeleteApiKeyUsecase};
