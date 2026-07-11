import z from "zod";

const SignupSchema = z.object({
    email:z.email(),
    password:z.string().trim().min(8)
})

export {SignupSchema};

