import express from "express";
import { router } from "./routes/index.js";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./shared/middlewares/global-error-handler.js";
import { connectRedis } from "./configs/redis-connection.js";

const app = express();

await connectRedis()

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.use(globalErrorHandler);

export {app};
