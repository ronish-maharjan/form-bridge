import { DatabaseError } from "../../../../shared/errors/database.error.js";
import { pool } from "../../../../configs/db-connection.js";
import { User } from "../../domain/entities/user.entity.js";
import { AuthRepository } from "../../domain/repositories/auth.repository.js";
import { fail,ok,Result } from "../../../../shared/result.js";
import { EmailVo } from "../../../shared/value-objects/email.vo.js";
import { ResourceNotFoundError } from "../../../../shared/errors/resource-not-found.error.js";
import { AuthMapper } from "../mapper/auth.mapper.js";

class AuthPostgressRepository implements AuthRepository{
    // future i will fix the proper error handling for specific error of db
    async save(user: User): Promise<Result<void, DatabaseError>> {
        try{
            await pool.query("insert into users(id,email,password)values($1,$2,$3)",[user.getId(),user.getEmail(),user.getHashedPassword()])
            return ok(undefined);
        }catch(err){
            return fail(new DatabaseError({message:"Database error.",options:{cause:err}})); 
        }
    }

    async findByEmail(email: EmailVo): Promise<Result<User, DatabaseError|ResourceNotFoundError>> {
        try{
            const result = await pool.query("select * from users where email = $1",[email.getValue()]);
            if(!result.rowCount){
                return fail(new ResourceNotFoundError({message:"User not found.",options:{context:{resource:"user",email:email.getValue()}}}))
            }
            const user:User = AuthMapper.toDomain(result.rows[0]);
            return ok(user)
        }catch(err){
            return fail(new DatabaseError({message:"Database error.",options:{cause:err}})); 
        }

    }
}

export {AuthPostgressRepository};
