import { DatabaseError } from "../../../../shared/errors/database.error.js"
import { Result } from "../../../../shared/result.js";
import { IdVo } from "../../../shared/value-objects/id.vo.js";
import { Api } from "../entities/api.entity.js";
import { UrlVo } from "../value-objects/url.vo.js";

interface ApiRepository {
    existsByUserIdAndUrl(userId:IdVo,url:UrlVo):Promise<Result<boolean,DatabaseError>>;
    save(api:Api):Promise<Result<void,DatabaseError>>;
    getById(id:IdVo):Promise<Result<Api[],DatabaseError>>;
    deleteByIdAndUserId(apiKeyId:IdVo,userId:IdVo):Promise<Result<void,DatabaseError>>;
}

export {ApiRepository};
