import { DataCorruptionError } from "../../../../shared/errors/data-corruption.error.js";
import { ResourceNotFoundError } from "../../../../shared/errors/resource-not-found.error.js";
import { fail, ok, Result } from "../../../../shared/result.js";
import { EmailVo } from "../../../shared/value-objects/email.vo.js";
import { IdVo } from "../../../shared/value-objects/id.vo.js";
import { User } from "../../domain/entities/user.entity.js";

type UserRow = {
    id:string;
    email:string;
    inbox_mail:string|null;
    created_at:Date;
    updated_at:Date;
    password:string;
}
class UserMapper {
    private constructor(){};
    static toDomain(userRow:UserRow):Result<User,DataCorruptionError>{
        const idResult = IdVo.create(userRow.id); 

        // checking if the db data are corrupted or not for dates we can add later but main data are being checked
        if(!idResult.ok){
            return fail(new DataCorruptionError({message:"Id corrupted.",options:{context:{id:userRow.id}}}));
        }
        const emailResult = EmailVo.create(userRow.email); 
        if(!emailResult.ok){
            return fail(new DataCorruptionError({message:"Email corrupted.",options:{context:{email:userRow.email}}}));
        }

        const inboxMail = userRow.inbox_mail
        let inboxMailVo = null;  
        if(inboxMail){
            const inboxMailResult = EmailVo.create(inboxMail); 
            if(!inboxMailResult.ok){
                return fail(new DataCorruptionError({message:"Inboxmail corrupted.",options:{context:{inboxMail:userRow.email}}}));
            }
            inboxMailVo = inboxMailResult.data;
        }
        const user = User.restore({id:idResult.data,email:emailResult.data,inboxMail:inboxMailVo,hashedPassword:userRow.password,createdAt:userRow.created_at,updatedAt:userRow.updated_at})
        return ok(user);

    }

    static toDb(user:User):Result<UserRow,ResourceNotFoundError>{
        return ok({id:user.getId(),email:user.getEmail(),inbox_mail:user.getInboxMail(),password:user.getHashedPassword(),created_at:user.getCreatedAt(),updated_at:user.getUpdatedAt()});
    }
}

export {UserMapper};
