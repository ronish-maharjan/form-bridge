import { EmailVo } from "../../../shared/value-objects/email.vo.js";
import { IdVo } from "../../../shared/value-objects/id.vo.js";
import { UserRepository } from "../../domain/repositories/user.repository.js";
import {ok,Result } from "../../../../shared/result.js";
import { AppError } from "../../../../shared/errors/app.error.js";

type ChangeInboxMailUsecaseData = {
    id:string,
    inboxMail:string;
}

class ChangeInboxMailUsecase {
    readonly #userRepository:UserRepository;
    constructor(repository:UserRepository){
        this.#userRepository = repository;
    }

    public execute = async (data:ChangeInboxMailUsecaseData):Promise<Result<void,AppError>>=>{
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

        // validate email with business logic
        const inboxMailResult = EmailVo.create(data.inboxMail);
        if(!inboxMailResult.ok){
            return inboxMailResult;
        }

        const changeInboxMailResult = user.changeInboxMail(inboxMailResult.data);
        if(!changeInboxMailResult.ok){
            return changeInboxMailResult;
        }

        const updateResult = await this.#userRepository.updateInboxMail(user);
        if(!updateResult.ok){
            return updateResult;
        }
        return ok(undefined);
    }
}

export {ChangeInboxMailUsecase};
