import { DataCorruptionError } from "../../../../shared/errors/data-corruption.error.js";
import { fail, Result, ok} from "../../../../shared/result.js";
import { IdVo } from "../../../shared/value-objects/id.vo.js";
import { Api } from "../../domain/entities/api.entity.js";
import { ApiKeyVo } from "../../domain/value-objects/api-key.vo.js";
import { UrlVo } from "../../domain/value-objects/url.vo.js";

type ApiRow = {
    id:string;
    user_id:string;
    url:string;
    api_key:string;
}
class ApiMapper {
    static toDb(api:Api):ApiRow{
        return { id:api.getId(),user_id:api.getUserId(),url:api.getUrl(),api_key:api.getApiKey()};
    }

    static toDomain(row:ApiRow):Result<Api,DataCorruptionError>{
        const idVoResult = IdVo.create(row.id);
        if(!idVoResult.ok){
            return fail(new DataCorruptionError({message:"Api id corrupted.",options:{context:{dbRow:"id",id:row.id}}})); 
        }

        const userIdVoResult = IdVo.create(row.user_id);
        if(!userIdVoResult.ok){
            return fail(new DataCorruptionError({message:"User id corrupted.",options:{context:{dbRow:"user_id",id:row.user_id}}})); 
        }

        const urlVoResult = UrlVo.create(row.url);
        if(!urlVoResult.ok){
            return fail(new DataCorruptionError({message:"Url corrupted.",options:{context:{dbRow:"url",id:row.url}}})); 
        }

        const apiKeyVoResult = ApiKeyVo.create(row.api_key);
        if(!apiKeyVoResult.ok){
            return fail(new DataCorruptionError({message:"Api key corrupted.",options:{context:{dbRow:"url",id:row.api_key}}})); 
        }

        const api = Api.restore({id:idVoResult.data,userId:userIdVoResult.data,url:urlVoResult.data,apiKey:apiKeyVoResult.data});
        return ok(api);
    }
}

export {ApiMapper};
