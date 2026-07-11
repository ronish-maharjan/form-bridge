import { createClient } from "redis";
import { env } from "./env.js";
import { ExternalServiceError } from "../shared/errors/external-service.error.js";

const redis = createClient({
    url: env.REDIS_CONNECTION_URL,
});

redis.on("error", (err) => {
    throw new ExternalServiceError({message:"Redis service unavailable",options:{cause:err}})
});

async function connectRedis() {
    try{
        await redis.connect();
    }catch(err){
        throw new ExternalServiceError({message:"Redis service unavailable",options:{cause:err}})
    }
}

export {redis,connectRedis};
