import z from "zod";

const ChangeInboxMailSchema = z.object({
    inboxMail:z.email()
})

export {ChangeInboxMailSchema};
