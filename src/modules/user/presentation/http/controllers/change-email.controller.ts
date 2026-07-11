import { NextFunction, Request ,Response} from "express";
import { ChangeEmailUsecase } from "../../../application/usecases/change-email.usecase.js";

class ChangeEmailController {
    readonly #changeEmailUsecase:ChangeEmailUsecase;
    constructor(usecase:ChangeEmailUsecase){
        this.#changeEmailUsecase = usecase;
    }

    public handle = async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const id = req.user?.id;
            const {email} = req.body;
            // we need to fix the type for id cause we know the id is definetly there from authentication guard
            const usecaseResult = await this.#changeEmailUsecase.execute({id,email});
            if(!usecaseResult.ok){
                throw usecaseResult.error;
            }
            return res.sendStatus(204);
        }catch(e){
            next(e);
        }
    }
}

export {ChangeEmailController}
