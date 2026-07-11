import dotenv from "dotenv"
import z from "zod";

dotenv.config();

const Environment = z.enum(["production","development"])
const envSchema = z.object({
    CONNECTION_STRING:z.string().trim().min(8),
    PORT:z.coerce.number(),
    JWT_SECRET_KEY:z.string().trim().min(8),
    RESEND_API_KEY:z.string().trim().min(32),
    REDIS_CONNECTION_URL:z.string().trim().min(8),
    ENVIRONMENT:Environment
})

const envData = {
    CONNECTION_STRING:process.env.DATABASE_CONNECTION_URL,
    PORT:process.env.PORT,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,
    RESEND_API_KEY:process.env.RESEND_API_KEY,
    REDIS_CONNECTION_URL:process.env.REDIS_CONNECTION_URL,
    ENVIRONMENT:process.env.ENVIRONMENT
}

const parsedEnv = envSchema.safeParse(envData)

if(!parsedEnv.success){
    console.log(parsedEnv.error.flatten().fieldErrors)
    process.exit(1)
}
const env = parsedEnv.data
export {env};

