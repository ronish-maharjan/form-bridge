import { ResourceNotFoundError } from "../../../../shared/errors/resource-not-found.error.js";
import { IdVo } from "../../../shared/value-objects/id.vo.js";
import { User } from "../entities/user.entity.js";
import { Result } from "../../../../shared/result.js";
import { DatabaseError } from "../../../../shared/errors/database.error.js";
import { EmailVo } from "../../../shared/value-objects/email.vo.js";

interface UserRepository {
    findById(idVo:IdVo):Promise<Result<User,ResourceNotFoundError|DatabaseError>>;
    findByEmail(email:EmailVo):Promise<Result<User,DatabaseError>>;
    updateEmail(user:User):Promise<Result<void,DatabaseError>>;
    updateInboxMail(user:User):Promise<Result<void,DatabaseError>>;
    updatePassword(user:User):Promise<Result<void,DatabaseError>>;
}

export {UserRepository};
