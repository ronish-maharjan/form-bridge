import { env } from "../../../configs/env.js";
import { Resend } from "resend";
import { MessageBuilder } from "../utils/message-builder.js";
import { fail, ok, Result } from "../../../shared/result.js";

class MailService {
    readonly #resend:Resend;
    constructor(resend:Resend){
        this.#resend = resend;
    }
    public async send(to:string,content:Object):Promise<Result<unknown,Error>>{
        const message = MessageBuilder.build(content);
        const result = await this.#resend.emails.send({
            from: "noreply@ronishmaharjan.info.np",
            to:to, 
            subject: "New form submission",
            html: `
            <h2>New Submission</h2>
            ${message}
            `,
        });
        if(result.error){
            return fail(new Error(result.error.message));
        }
       return ok(result.data);
    }

}

const resend = new Resend(env.RESEND_API_KEY);
const mailService = new MailService(resend);

export {mailService};

