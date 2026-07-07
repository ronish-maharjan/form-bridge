import { Request,Response,NextFunction } from "express";
import { SendMailUsecase } from "../usecases/send-mail.usecase.js";

class SendMailController {
    readonly #sendMailUsecase:SendMailUsecase;
    constructor(usecase:SendMailUsecase){
        this.#sendMailUsecase = usecase;
    }
    public handle = async (req:Request,res:Response,next:NextFunction) =>{
        try{
        const inboxMail = req.user?.inboxMail;
        const content = req.body;
        const result = await this.#sendMailUsecase.execute(inboxMail,content);
        if(!result.ok){
            throw result.error;
        }
        return res.status(200).json({success:true})
        }catch(err){
            res.status(500).json({success:false,error:err});
        }
    }
}


const sendMailUsecase = new SendMailUsecase();
const sendMailController = new SendMailController(sendMailUsecase);

export {sendMailController};
