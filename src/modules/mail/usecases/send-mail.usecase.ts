import { mailService } from "../services/mail.service.js"
import { Result } from "../../../shared/result.js";

class SendMailUsecase {

    public execute = async(to:string,content:Object):Promise<Result<unknown,Error>>=>{
           const result = await mailService.send(to,content); 
           return result;
    }
}

export {SendMailUsecase}
