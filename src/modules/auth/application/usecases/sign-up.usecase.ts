import { AuthRepository } from "../../domain/repositories/auth.repository.js";
import { fail, ok, Result } from "../../../../shared/result.js";
import { ValidationError } from "../../../../shared/errors/validation.error.js";
import { ResourceAlreadyExistsError } from "../../../../shared/errors/resource-already-exists.error.js";
import { IdGenerator } from "../../../../shared/utils/id-generator.js";
import { User } from "../../domain/entities/user.entity.js";
import { PasswordHasher } from "../../../../shared/utils/passwordHasher.js";
import { PasswordVo } from "../../../shared/value-objects/password.vo.js";
import { EmailVo } from "../../../shared/value-objects/email.vo.js";
import { IdVo } from "../../../shared/value-objects/id.vo.js";

type SignupData = {email:string,password:string};

class SignupUsecase {
    readonly #repository:AuthRepository;
    constructor(repository:AuthRepository){
        this.#repository = repository;
    }

    async execute(data:SignupData):Promise<Result<void,ValidationError>>{

        const {email,password} = data;
       
        // Business Rule Validations

        const passwordResult = PasswordVo.create(password);
        if(!passwordResult.ok){
            return passwordResult; 
        }
        
        const emailResult = EmailVo.create(email);
        if(!emailResult.ok){
            return emailResult;
        }

        const id = IdGenerator.generate();
        const idResult = IdVo.create(id);
        if(!idResult.ok){
            return idResult
        }


        // checking if user already exist
        // remember the findbyemail result will be false if user not found 

        const userExists = await this.#repository.findByEmail(emailResult.data);
        if(userExists.ok){
            return fail(new ResourceAlreadyExistsError({message:"User already exists.",options:{context:{resource:"user",email:userExists.data.getEmail()}}}));
        }

        //Hash password 
        const hashedPassword = await PasswordHasher.hash(password);

        // Create User Entity
        const user = User.create({id:idResult.data,email:emailResult.data,hashedPassword})

        //Save the user data in database
        const saveResult = await this.#repository.save(user);
        if(!saveResult){
            return saveResult;
        }

        //Return result
        return ok(undefined);
    }

}
export {SignupUsecase};
