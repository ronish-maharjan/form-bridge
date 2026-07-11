import { app } from "./app.js";
import { env } from "./configs/env.js";
import { logger } from "./shared/logger/logger.js";

const PORT = env.PORT;

app.listen(PORT,()=>{
    logger.info(`Server listening on port: ${PORT}`);
})
