import { fail, ok, Result } from "../../../../shared/result.js";
import { EmailVo } from "../../../shared/value-objects/email.vo.js";
import { IdVo } from "../../../shared/value-objects/id.vo.js";
import { UserRepository } from "../../domain/repositories/user.repository.js";
import { ValidationError } from "../../../../shared/errors/validation.error.js";
import { DataCorruptionError } from "../../../../shared/errors/data-corruption.error.js";
import { ResourceAlreadyExistsError } from "../../../../shared/errors/resource-already-exists.error.js";

type ChangeEmailUsecaseData = {id:string,email:string}

class ChangeEmailUsecase {
        readonly #userRepository:UserRepository;
        constructor(repository:UserRepository){
            this.#userRepository = repository;
        }

        public execute = async(data:ChangeEmailUsecaseData):Promise<Result<void,ValidationError|DataCorruptionError|ResourceAlreadyExistsError>>=>{

            // Finding the user by id
            const idResult = IdVo.create(data.id)
            if(!idResult.ok){
                return idResult;
            }

            // Db result return user object if success else errors
            const dbResult = await this.#userRepository.findById(idResult.data);
            if(!dbResult.ok){
                return dbResult;
            }

            const user = dbResult.data;

            const emailResult= EmailVo.create(data.email);
            if(!emailResult.ok){
                return emailResult;
            }

            // will throw error if same email
            const changeEntityEmailResult = user.changeEmail(emailResult.data);
            if(!changeEntityEmailResult.ok){
                return changeEntityEmailResult;
            }

            // check if email already exist or not
            const emailExistResult = await this.#userRepository.findByEmail(emailResult.data);
            if(emailExistResult.ok){
                return fail(new ResourceAlreadyExistsError({message:"Email already exists.",options:{context:{resource:"email",email:emailExistResult.data.getEmail()}}}));
            }

            // update the email
            const updateResult = await this.#userRepository.updateEmail(user);

            if(!updateResult.ok){
                return updateResult;
            }

            return ok(undefined);
        }
}

export {ChangeEmailUsecase};
