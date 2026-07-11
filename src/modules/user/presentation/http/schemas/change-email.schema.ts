import z from "zod";

const ChangeEmailSchema = z.object({
    email:z.email()
})

export {ChangeEmailSchema};
