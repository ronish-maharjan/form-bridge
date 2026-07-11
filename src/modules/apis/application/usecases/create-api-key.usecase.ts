import { AppError } from "../../../../shared/errors/app.error.js";
import { ResourceAlreadyExistsError } from "../../../../shared/errors/resource-already-exists.error.js";
import { fail, ok, Result } from "../../../../shared/result.js";
import { ApiKeyGenerator } from "../../../../shared/utils/api-key-generator.js";
import { IdGenerator } from "../../../../shared/utils/id-generator.js";
import { IdVo } from "../../../shared/value-objects/id.vo.js";
import { Api } from "../../domain/entities/api.entity.js";
import { ApiRepository } from "../../domain/repositories/api.repository.js";
import { ApiKeyVo } from "../../domain/value-objects/api-key.vo.js";
import { UrlVo } from "../../domain/value-objects/url.vo.js";

type CreateApiKeyUsecaseData = {
    userId:string;
    url:string;
}

type CreateApiKeyResult = {
    url:string;
    apiKey:string;
}

class CreateApiKeyUsecase {
    readonly #apiRepository:ApiRepository;
    constructor(repository:ApiRepository){
        this.#apiRepository = repository;
    }
    public execute = async(data:CreateApiKeyUsecaseData):Promise<Result<CreateApiKeyResult,AppError>>=>{
        const {userId,url} = data;

        // business logic validation 
        const userIdVoResult = IdVo.create(userId);
        if(!userIdVoResult.ok){
            return userIdVoResult;
        }

        const urlVoResult = UrlVo.create(url);
        if(!urlVoResult.ok){
            return urlVoResult;
        }

        // check if the url already exist 
        const dbResult = await this.#apiRepository.existsByUserIdAndUrl(userIdVoResult.data,urlVoResult.data);
        if(!dbResult.ok){
            return dbResult;
        }
        const isExist = dbResult.data;
        if(isExist){
            return fail(new ResourceAlreadyExistsError({message:"Url already exists.",options:{context:{resource:"url",url}}}));
        }

        //generate apikey

        const apikey = ApiKeyGenerator.generate();
        const apikeyVoResult = ApiKeyVo.create(apikey);
        if(!apikeyVoResult.ok){
            return apikeyVoResult;
        }

        const id = IdGenerator.generate();
        const idVoResult = IdVo.create(id);
        if(!idVoResult.ok){
            return idVoResult;
        }

        // create api entity

        const api = Api.create({id:idVoResult.data,url:urlVoResult.data,apiKey:apikeyVoResult.data,userId:userIdVoResult.data,})
        
        // save to db
        const saveResult = await this.#apiRepository.save(api);
        if(!saveResult.ok){
            return saveResult;
        }

        const result:CreateApiKeyResult = {url:urlVoResult.data.getValue(),apiKey:apikeyVoResult.data.getValue()};
        return ok(result);
    }
}

export {CreateApiKeyUsecase};
