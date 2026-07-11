import z from "zod";

const LoginSchema = z.object({
    email:z.email({message:"Invalid email format."}),
    password:z.string({message:"Invalid password format."}).trim().min(8,{message:"Password should be minium lenght 8"})
})

export {LoginSchema};

