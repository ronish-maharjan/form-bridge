import { app } from "./app.js";
import { env } from "./configs/env.js";
import { logger } from "./shared/logger/logger.js";
import { connectRedis } from "./configs/redis-connection.js";

const PORT = env.PORT;

// Essential connections
await connectRedis()

logger.info("Connected successfully to redis")
app.listen(PORT,()=>{
    logger.info(`Server listening on port: ${PORT}`);
})
