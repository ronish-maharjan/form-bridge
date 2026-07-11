import { NextFunction, Request ,Response} from "express";
import { ChangeInboxMailUsecase } from "../../../application/usecases/change-inbox-mail.usecase.js";

class ChangeInboxMailController {
    readonly #changeInboxMailUsecase:ChangeInboxMailUsecase;
    constructor(usecase:ChangeInboxMailUsecase){
        this.#changeInboxMailUsecase = usecase;
    }

    public handle = async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const id = req.user?.id;
            const {inboxMail} = req.body;
            // we need to fix the type for id cause we know the id is definetly there from authentication guard
            const usecaseResult = await this.#changeInboxMailUsecase.execute({id,inboxMail});
            if(!usecaseResult.ok){
                throw usecaseResult.error;
            }
            return res.sendStatus(204);
        }catch(e){
            next(e);
        }
    }
}

export {ChangeInboxMailController}
