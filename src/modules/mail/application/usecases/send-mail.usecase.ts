import { ExternalServiceError } from "../../../../shared/errors/external-service.error.js";
import { ok, Result } from "../../../../shared/result.js";
import { MailSender } from "../../domain/ports/mail-sender.port.js";

type SendMailUsecaseData = {
    inboxMail:string;
    contents:Record<string,unknown>;
}   

class SendMailUsecase {
    readonly #mailSender:MailSender;
    constructor(mailSender:MailSender){
        this.#mailSender = mailSender;
    }    

    public execute = async(data:SendMailUsecaseData):Promise<Result<void,ExternalServiceError>>=>{
        const inboxMail = data.inboxMail;
        const contents = data.contents;
        const mailSenderResult = await this.#mailSender.send({to:inboxMail,contents})
        if(!mailSenderResult.ok){
            return mailSenderResult;
        }

        return ok(undefined);
    }
}

export {SendMailUsecase};
