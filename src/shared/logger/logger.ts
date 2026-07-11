import { env } from "../../configs/env.js";
import pino from "pino";

const config = env.ENVIRONMENT==="production"?{level:"info"}:{level:"debug",transport:{target:"pino-pretty"}}

const logger = pino(config);

export {logger};
