import { env } from "../../../../configs/env.js";
import { Resend } from "resend";
import { MessageBuilder } from "../../utils/message-builder.js";
import { fail, ok, Result } from "../../../../shared/result.js";
import { MailSender } from "../../domain/ports/mail-sender.port.js";
import { ExternalServiceError } from "../../../../shared/errors/external-service.error.js";

class ResendMailSender implements MailSender {
    readonly #resend:Resend;
    constructor(){
        this.#resend = new Resend(env.RESEND_API_KEY);
    }

    async send({ to, contents }: { to: string; contents: Record<string, unknown>; }): Promise<Result<void, ExternalServiceError>> {
        const message = MessageBuilder.build(contents);
        const result = await this.#resend.emails.send({
            from: "noreply@ronishmaharjan.info.np",
            to, 
            subject: "New form submission",
            html: `
            <h2>New Submission</h2>
            ${message}
            `,
        });
        if(result.error){
            return fail(new ExternalServiceError({message:"Resend service unavailable",options:{cause:result.error,context:{service:"Resend mail service"}}}));
        }
        return ok(undefined);
    }
}

export {ResendMailSender};
