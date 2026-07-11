import { DatabaseError } from "pg";
import { ValidationError } from "../../../../shared/errors/validation.error.js";
import { ok, Result } from "../../../../shared/result.js";
import { IdVo } from "../../../shared/value-objects/id.vo.js";
import { UserRepository } from "../../domain/repositories/user.repository.js";

type GetUserUsecaseData = {id:string};

type GetUserUsecaseResult = {
    id:string,
    email:string,
    inboxMail:string|null,
    createdAt:Date,
    updatedAt:Date,
}

class GetUserUsecase {
    readonly #userRepository:UserRepository;

    constructor(repository:UserRepository){
        this.#userRepository=repository;
    };

    public execute = async (data:GetUserUsecaseData):Promise<Result<GetUserUsecaseResult,ValidationError|DatabaseError>> =>{
        const id = data.id;
        const idResult = IdVo.create(id);
        if(!idResult.ok){
            return idResult;
        }

        // get from db
        const dbResult = await this.#userRepository.findById(idResult.data);
        if(!dbResult.ok){
            return dbResult;
        }

        //convert to safe result
        const user = dbResult.data
        const result = {id:user.getId(),email:user.getEmail(),inboxMail:user.getInboxMail(),createdAt:user.getCreatedAt(),updatedAt:user.getUpdatedAt()};

        return ok(result);
    }
}


export {GetUserUsecase};
