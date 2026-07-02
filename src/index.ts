import express from "express";
import {env} from "./configs/env.js";
import { healthRouter } from "./routes/health.routes.js";

// creating the express app
const app = express();

app.use(healthRouter);

app.listen(env.port,()=>{console.log("listening",env.port)})
