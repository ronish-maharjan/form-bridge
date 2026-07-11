import express from "express";
import { router } from "./routes/index.js";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./shared/middlewares/global-error-handler.js";

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.use(globalErrorHandler);

export {app};
