import { InvalidCredentialsError } from "../../../../shared/errors/invalid-credientials.error.js";
import { DatabaseError } from "../../../../shared/errors/database.error.js";
import { ResourceNotFoundError } from "../../../../shared/errors/resource-not-found.error.js";
import { ValidationError } from "../../../../shared/errors/validation.error.js";
import { fail, ok, Result } from "../../../../shared/result.js";
import { PasswordHasher } from "../../../../shared/utils/passwordHasher.js";
import { AuthRepository } from "../../domain/repositories/auth.repository.js";
import { EmailVo } from "../../../shared/value-objects/email.vo.js";

type LoginData = {
    email:string;
    password:string;
}

type LoginUsecaseResult = {
    id:string;
    email:string;
}

class LoginUsecase{
    readonly #repository:AuthRepository;
    constructor(repository:AuthRepository){
        this.#repository = repository;
    }

    public execute = async(data:LoginData):Promise<Result<LoginUsecaseResult,ValidationError|ResourceNotFoundError|InvalidCredentialsError|DatabaseError>>=>{
        const {email,password} = data;

        const emailResult = EmailVo.create(email);
        if(!emailResult.ok){
            return emailResult;
        }

        // checking if user already exist

        const result = await this.#repository.findByEmail(emailResult.data);
        if(!result.ok){
            return fail(new InvalidCredentialsError({message:"Invalid email or password."}));
        }

        //retriving user valid passwordhash and verify 
        const hashedPassword = result.data.getHashedPassword();

        const isValidPassword = await PasswordHasher.verify(hashedPassword,password);
        if(!isValidPassword){
            return fail(new InvalidCredentialsError({message:"Invalid password or email."}));
        }
        
        return ok({id:result.data.getId(),email:result.data.getEmail()});
    }
}

export {LoginUsecase};
