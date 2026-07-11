import { DatabaseError } from "../../../../shared/errors/database.error.js";
import { pool } from "../../../../configs/db-connection.js";
import { ResourceNotFoundError } from "../../../../shared/errors/resource-not-found.error.js";
import { fail, ok, Result } from "../../../../shared/result.js";
import { IdVo } from "../../../shared/value-objects/id.vo.js";
import { User } from "../../domain/entities/user.entity.js";
import { UserRepository } from "../../domain/repositories/user.repository.js";
import { UserMapper } from "../mappers/user.mapper.js";
import { EmailVo } from "../../../shared/value-objects/email.vo.js";
import { DataCorruptionError } from "../../../../shared/errors/data-corruption.error.js";

class UserPostgresRepository implements UserRepository{

    async findById(idVo: IdVo): Promise<Result<User, ResourceNotFoundError|DatabaseError>> {
        try{
            const id = idVo.getValue(); 
            const dbResult = await pool.query("select id,email,password,inbox_mail,created_at,updated_at from users where id = $1",[id]);
            if(dbResult.rowCount === 0){
                return fail(new ResourceNotFoundError({message:"User not found",options:{context:{resource:"user",id}}}));
            }
            const mapperResult = UserMapper.toDomain(dbResult.rows[0])
            if(!mapperResult.ok){
                return mapperResult;
            }
            return ok(mapperResult.data);
        }catch(err){
            return fail(new DatabaseError({message:"Database error",options:{cause:err}}));
        }
    }

    async findByEmail(email: EmailVo): Promise<Result<User, DatabaseError|ResourceNotFoundError|DataCorruptionError>> {
        try{
            const result = await pool.query("select * from users where email = $1",[email.getValue()]);
            if(!result.rowCount){
                return fail(new ResourceNotFoundError({message:"User not found.",options:{context:{resource:"user",email:email.getValue()}}}))
            }
            const mapperResult = UserMapper.toDomain(result.rows[0]);
            if(!mapperResult.ok){
                return mapperResult;
            }
            return ok(mapperResult.data);
        }catch(err){
            return fail(new DatabaseError({message:"Database error.",options:{cause:err}})); 
        }

    }
    async updateEmail(user:User):Promise<Result<void, DatabaseError|ResourceNotFoundError>> {
        try{
            const mapperResult = UserMapper.toDb(user);
            if(!mapperResult.ok){
                return mapperResult;
            }
            const row = mapperResult.data;
            await pool.query("update users set email = $1 where id = $2",[row.email,row.id]);
            return ok(undefined);
        }catch(err){
            return fail(new DatabaseError({message:"Database error.",options:{cause:err}})); 
        }
    }

    async updateInboxMail(user: User): Promise<Result<void, DatabaseError>> {
        
        try{
            const mapperResult = UserMapper.toDb(user);
            if(!mapperResult.ok){
                return mapperResult;
            }
            const row = mapperResult.data;
            await pool.query("update users set inbox_mail = $1 where id = $2",[row.inbox_mail,row.id]);
            return ok(undefined);

        }catch(err){
            return fail(new DatabaseError({message:"Database error.",options:{cause:err}})); 
        }
    }

    async updatePassword(user: User): Promise<Result<void, DatabaseError>> {
        
        try{
            const mapperResult = UserMapper.toDb(user);
            if(!mapperResult.ok){
                return mapperResult;
            }
            const row = mapperResult.data;
            await pool.query("update users set password = $1 where id = $2",[row.password,row.id]);
            return ok(undefined);

        }catch(err){
            return fail(new DatabaseError({message:"Database error.",options:{cause:err}})); 
        }
    }
}

export {UserPostgresRepository};
