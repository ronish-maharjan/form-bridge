import { NextFunction, Request ,Response} from "express";
import { ChangePasswordUsecase } from "../../../application/usecases/change-password.usecase.js";

class ChangePasswordController {
    readonly #changePasswordUsecase:ChangePasswordUsecase;
    constructor(usecase:ChangePasswordUsecase){
        this.#changePasswordUsecase = usecase;
    }

    public handle = async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const id = req.user?.id;
            const {password} = req.body;
            // we need to fix the type for id cause we know the id is definetly there from authentication guard
            const usecaseResult = await this.#changePasswordUsecase.execute({id,password});
            if(!usecaseResult.ok){
                throw usecaseResult.error;
            }
            return res.sendStatus(204);
        }catch(e){
            next(e);
        }
    }
}

export {ChangePasswordController}
