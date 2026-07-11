import z from "zod";

const ChangePasswordSchema = z.object({
    password:z.string().trim().min(8,{message:"Password must be minimul length of 8"})
})

export {ChangePasswordSchema};
