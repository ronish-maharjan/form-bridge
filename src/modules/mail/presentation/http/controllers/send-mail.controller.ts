import { NextFunction, Request ,Response} from "express";
import { SendMailUsecase } from "../../../application/usecases/send-mail.usecase.js";

class SendMailController {
    readonly #sendMailUsecase:SendMailUsecase;
    constructor(usecase:SendMailUsecase){
        this.#sendMailUsecase = usecase;
    }

    public handle = async(req:Request,res:Response,next:NextFunction)=>{
        try{
        const inboxMail = req.user?.inboxMail;
        const contents = req.body;
        const usecaseResult = await this.#sendMailUsecase.execute({inboxMail,contents});
        if(!usecaseResult.ok){
            return usecaseResult;
        }
        return res.status(200).json({success:true});
        }catch(err){
            next(err);
        }
    }

};

export {SendMailController};
