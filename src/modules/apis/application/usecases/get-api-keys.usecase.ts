import { AppError } from "../../../../shared/errors/app.error.js";
import { ok, Result } from "../../../../shared/result.js";
import { IdVo } from "../../../shared/value-objects/id.vo.js";
import { ApiRepository } from "../../domain/repositories/api.repository.js";

type GetApiKeysUsecaseData = {
    id:string;
}

type GetApiKeysUsecaseResult ={
    id:string;
    url:string;
    apiKey:string;
}[]

class GetApiKeysUsecase {
    readonly #apiRepository:ApiRepository;
    constructor(repository:ApiRepository){
        this.#apiRepository = repository;
    }

    public async execute(data:GetApiKeysUsecaseData):Promise<Result<GetApiKeysUsecaseResult,AppError>>{

        // convert the id into vo
        const idVoResult = IdVo.create(data.id);
        if(!idVoResult.ok){
            return idVoResult;
        }

        // get apis from db
        const dbResult = await this.#apiRepository.getById(idVoResult.data);
        if(!dbResult.ok){
            return dbResult;
        }
        const apis = dbResult.data

        // convert into suitable result format
        let result = apis.map((api)=>{
            return {id:api.getId(),url:api.getUrl(),apiKey:api.getApiKey()}
        });
        return ok(result);
    }
}

export {GetApiKeysUsecase};
