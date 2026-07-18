import express, { Request ,Response} from "express";
import path from "node:path";
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


// main landing page route
// currently serving basic landing page :)
app.get("/", (req:Request, res:Response) => {
  res.sendFile(path.join(process.cwd(), "assets", "index.html"));
});

// Main routes of our application
app.use("/api", router);

// Api documentation route
app.use( "/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Catch all routes
app.all("/{*path}", (req:Request, res:Response) => {
  res.status(404).send("404 Not Found");
});

// Global Error handler
app.use(globalErrorHandler);

export {app};
