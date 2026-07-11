import { SendMailUsecase } from "./application/usecases/send-mail.usecase.js";
import { SendMailController } from "./presentation/http/controllers/send-mail.controller.js";
import { MailSender } from "./domain/ports/mail-sender.port.js";
import { ResendMailSender } from "./infrastructure/adapters/resend-mail-sender.adapter.js";

// Mail senders
const resendMailSender:MailSender = new ResendMailSender();

//usecases
const sendMailUsecase = new SendMailUsecase(resendMailSender);

//controllers
const sendMailController = new SendMailController(sendMailUsecase);

export {sendMailController};

