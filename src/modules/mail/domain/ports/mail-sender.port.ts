import { ExternalServiceError } from "../../../../shared/errors/external-service.error.js";
import { Result } from "../../../../shared/result.js";

interface MailSender {
    send({to,contents}:{to:string,contents:Record<string,unknown>}):Promise<Result<void,ExternalServiceError>>;
}

export {MailSender};
