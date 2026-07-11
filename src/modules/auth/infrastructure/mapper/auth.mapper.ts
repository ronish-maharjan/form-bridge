import { User } from "../../domain/entities/user.entity.js";
import { EmailVo } from "../../../shared/value-objects/email.vo.js";
import { IdVo } from "../../../shared/value-objects/id.vo.js";

type authDbRow = {id:string,email:string,password:string};

class AuthMapper {
    private constructor(){};
    static toDomain(row:authDbRow){

        const emailResult = EmailVo.create(row.email);
        if(!emailResult.ok){
            throw emailResult;
        }

        const idResult = IdVo.create(row.id);
        if(!idResult.ok){
            throw idResult
        }

        const password = row.password;
        const user = User.restore({id:idResult.data,email:emailResult.data,hashedPassword:password});
        return user;
    }
    static toDb(user:User){
        return {id:user.getId(),email:user.getEmail(),password:user.getHashedPassword()};
    }
}

export {AuthMapper};
