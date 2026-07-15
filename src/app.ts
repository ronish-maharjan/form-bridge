import express from "express";
import { router } from "./routes/index.js";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./shared/middlewares/global-error-handler.js";
import swaggerUi from "swagger-ui-express";
import SwaggerParser from "@apidevtools/swagger-parser";

const swaggerDocument = await SwaggerParser.bundle( "docs/openapi/openapi.yml");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.use( "/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(globalErrorHandler);

export {app};
