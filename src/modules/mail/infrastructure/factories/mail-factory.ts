import { InternalServerError } from "../../../../shared/errors/internal-server.error.js";
import { ResendMailSender } from "../adapters/resend-mail-sender.adapter.js";

const AvailableMail= {
    "RESEND":"RESEND",
} as const

type AvailableMailType = keyof typeof AvailableMail;

class MailFactory{
    private constructor(){};
    static create(type:AvailableMailType){
        switch(type){
            case "RESEND":
                return new ResendMailSender();
            default:
                const _null:never = type
                throw new InternalServerError({message:"Invalid Mail sender"})
        }
    }
}

export {MailFactory, AvailableMail}
