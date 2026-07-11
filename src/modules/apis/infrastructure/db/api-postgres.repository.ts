import { pool } from "../../../../configs/db-connection.js";
import { DataCorruptionError } from "../../../../shared/errors/data-corruption.error.js";
import { DatabaseError } from "../../../../shared/errors/database.error.js";
import { ResourceNotFoundError } from "../../../../shared/errors/resource-not-found.error.js";
import { fail, ok, Result } from "../../../../shared/result.js";
import { IdVo } from "../../../shared/value-objects/id.vo.js";
import { Api } from "../../domain/entities/api.entity.js";
import { ApiRepository } from "../../domain/repositories/api.repository.js";
import { UrlVo } from "../../domain/value-objects/url.vo.js";
import { ApiMapper } from "../mappers/api.mapper.js";

class ApiPostgresRepository implements ApiRepository{
    async existsByUserIdAndUrl(userId: IdVo, url: UrlVo): Promise<Result<boolean, DatabaseError>> {
        try{
            const dbResult = await pool.query("select id from apis where user_id = $1 and url = $2",[userId.getValue(),url.getValue()]);
            if(dbResult.rowCount === 0){
                return ok(false);
            }
            return ok(true);
        }catch(err){
            return fail(new DatabaseError({message:"Database error",options:{cause:err}}));
        }
    }
    async save(api: Api): Promise<Result<void, DatabaseError>> {
        try{
            const row = ApiMapper.toDb(api);  
            await pool.query("insert into apis(id,user_id,url,api_key)values($1,$2,$3,$4)",[row.id,row.user_id,row.url,row.api_key]);
            return ok(undefined);
        }catch(err){
            return fail(new DatabaseError({message:"Database error",options:{cause:err}}));
        }

    }

    async getById(id: IdVo): Promise<Result<Api[], DatabaseError | DataCorruptionError>> {
        try {
            const dbResult = await pool.query(
                "SELECT id, user_id, url, api_key FROM apis WHERE user_id = $1",
                [id.getValue()]
            );

            const apis: Api[] = [];

            for (const row of dbResult.rows) {
                const mapped = ApiMapper.toDomain(row);

                if (!mapped.ok) {
                    return mapped;
                }

                apis.push(mapped.data);
            }

            return ok(apis);
        } catch (err) {
            return fail( new DatabaseError({ message: "Database error", options: { cause: err } }));
        }
    }

    async deleteByIdAndUserId(apiKeyId: IdVo, userId: IdVo): Promise<Result<void, DatabaseError|ResourceNotFoundError>> {
        try{
            const user_id = userId.getValue();
            const id = apiKeyId.getValue();
            console.log(user_id,id)
            const dbResult = await pool.query("delete from apis where id = $1 and user_id = $2",[id,user_id]);
            if(dbResult.rowCount ===0){
                return fail(new ResourceNotFoundError({message:"Api key does not exists.",options:{context:{resource:"api",id}}}))
            }
            return ok(undefined);
        }catch(err){
            return fail( new DatabaseError({ message: "Database error", options: { cause: err } }));
        } 
    }

}

export {ApiPostgresRepository};
