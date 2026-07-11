import { IdVo } from "../../../shared/value-objects/id.vo.js";
import { UserRepository } from "../../domain/repositories/user.repository.js";
import {ok,Result ,fail} from "../../../../shared/result.js";
import { AppError } from "../../../../shared/errors/app.error.js";
import { PasswordHasher } from "../../../../shared/utils/passwordHasher.js";
import { PasswordVo } from "../../../shared/value-objects/password.vo.js";
import { ValidationError } from "../../../../shared/errors/validation.error.js";

type ChangePasswordUsecaseData = {
    id:string,
    password:string
}

class ChangePasswordUsecase {
    readonly #userRepository:UserRepository;
    constructor(repository:UserRepository){
        this.#userRepository = repository;
    }

    public execute = async (data:ChangePasswordUsecaseData):Promise<Result<void,AppError>>=>{
        // Finding the user by id
        const idResult = IdVo.create(data.id)
        if(!idResult.ok){
            return idResult;
        }

        const passwordVo = PasswordVo.create(data.password)
        if(!passwordVo.ok){
            return passwordVo;
        }

        // Db result return user object if success else errors
        const dbResult = await this.#userRepository.findById(idResult.data);
        if(!dbResult.ok){
            return dbResult;
        }

        const user = dbResult.data;

        // business rule validation for password
        // checking if the password is same as current 
        const isCurrent = await PasswordHasher.verify(user.getHashedPassword(),data.password);
        if(isCurrent){
            return fail(new ValidationError({message:"New password is same as current one"}));
        }

        
        const newHashedPassword = await PasswordHasher.hash(passwordVo.data.getValue())

        const changePasswordResult = user.changePassword(newHashedPassword);
        if(!changePasswordResult.ok){
            return changePasswordResult;
        }

        const updateResult = await this.#userRepository.updatePassword(user);

        if(!updateResult.ok){
            return updateResult;
        }
        return ok(undefined);
    }
}

export {ChangePasswordUsecase};
