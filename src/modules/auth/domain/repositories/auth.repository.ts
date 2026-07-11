import { DatabaseError } from "../../../../shared/errors/database.error.js";
import { User } from "../entities/user.entity.js";
import { Result } from "../../../../shared/result.js";
import { EmailVo } from "../../../shared/value-objects/email.vo.js";
import { ResourceNotFoundError } from "../../../../shared/errors/resource-not-found.error.js";

interface AuthRepository {
   findByEmail(email:EmailVo):Promise<Result<User,DatabaseError>>;
   save(user:User):Promise<Result<void,DatabaseError|ResourceNotFoundError>>;
}

export {AuthRepository};
