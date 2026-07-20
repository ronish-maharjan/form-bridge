import { SendMailUsecase } from "./application/usecases/send-mail.usecase.js";
import { SendMailController } from "./presentation/http/controllers/send-mail.controller.js";
import { MailSender } from "./domain/ports/mail-sender.port.js";
import { AvailableMail, MailFactory } from "./infrastructure/factories/mail-factory.js";

// Mail senders
const mailSender:MailSender = MailFactory.create(AvailableMail.RESEND);

//usecases
const sendMailUsecase = new SendMailUsecase(mailSender);

//controllers
const sendMailController = new SendMailController(sendMailUsecase);

export {sendMailController};

