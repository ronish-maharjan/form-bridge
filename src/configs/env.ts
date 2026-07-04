import dotenv from "dotenv"
import z from "zod";
dotenv.config();

const envSchema = z.object({
    CONNECTION_STRING:z.string().trim().min(8),
    PORT:z.coerce.number(),
    JWT_SECRET_KEY:z.string().trim().min(8)
})

const envData = {
    CONNECTION_STRING:process.env.DATABASE_CONNECTION_URL,
    PORT:process.env.PORT,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY
}

const parsedEnv = envSchema.safeParse(envData)

if(!parsedEnv.success){
    console.log(parsedEnv.error.flatten().fieldErrors)
    process.exit(1)
}
const env = parsedEnv.data
export {env};

